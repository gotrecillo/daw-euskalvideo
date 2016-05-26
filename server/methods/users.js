import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'user.updateProfile'(imgUrl, displayName) {
      check(imgUrl, String);
      check(displayName, String);
      const myNewProfile = { imgUrl, displayName };
      Meteor.users.update(Meteor.userId(), { $set: { profile: myNewProfile }});
    },

    'user.userHasPassword'() {
      return Meteor.user().services.password;
    }

  });
}
