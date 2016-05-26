import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'user.updateProfile'(imgUrl, displayName) {
      console.log('method');
      check(imgUrl, String);
      check(displayName, String);
      console.log(displayName);
      const myNewProfile = { imgUrl, displayName };
      Meteor.users.update(Meteor.userId(), { $set: { profile: myNewProfile }});

    }

  });
}
