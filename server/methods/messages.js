import {Meteor} from 'meteor/meteor';
import {Messages} from '/lib/collections';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'message.create'(text) {
      const userId = Meteor.userId();
      check(userId, String);
      check(text, String);
      const createdAt = new Date();
      const message = { creator: userId, text, createdAt, received: true };
      // DEMO
      // Meteor._sleepForMs(3500);
      Messages.insert(message);
    },

  });
}
