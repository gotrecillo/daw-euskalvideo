import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('user.profile', function (_id) {
    check(_id, String);
    const selector = {_id};
    const options = {
      fields: {_id: 1, profile: 1},
    };

    return Meteor.users.find(selector, options);
  });
}
