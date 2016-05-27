
import {Meteor} from 'meteor/meteor';

export default function () {
  Meteor.publish('presence.online', function () {
    const filter = { userId: { $exists: true }};
    /* global Presences:true */
    return Presences.find(filter, { fields: { state: true, userId: true }});
  });
}

