import { Accounts } from 'meteor/accounts-base';

export default () => {
  const getFacebookData = payload => {
    const imgUrl = `http://graph.facebook.com/${payload.id}/picture/?type=large`;
    const displayName = payload.name;
    return {
      imgUrl,
      displayName,
    };
  };

  const getTwitterData = payload => {
    const imgUrl = payload.profile_image_url_https;
    const displayName = payload.screenName;
    return {
      imgUrl,
      displayName,
    };
  };

  const getGoogleData = payload => {
    const imgUrl = payload.picture;
    const displayName = payload.name;
    return {
      imgUrl,
      displayName,
    };
  };

  Accounts.config({
    forbidClientAccountCreation: true
  });

  Accounts.onCreateUser(function (options, user) {
    let profile = {};

    if (user.services.facebook) {
      profile = getFacebookData(user.services.facebook);
    }

    if (user.services.twitter) {
      profile = getTwitterData(user.services.twitter);
    }

    if (user.services.google) {
      profile = getGoogleData(user.services.google);
    }

    return Object.assign(user, { profile });
  });
};
