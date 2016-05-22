import {Nominations} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.methods({
    'nominations.create'(title, youtubeId, comment = '') {
      const userId = Meteor.userId();
      const _id = Meteor.uuid();

      check(title, String);
      check(comment, String);
      check(youtubeId, String);
      check(userId, String);
      // Demo the latency compensations (Delete this in production)
      // Meteor._sleepForMs(500);

      // XXX: Do some user authorization
      const createdAt = new Date();
      const nomination = {_id, title, comment, youtubeId, createdAt, creator: userId};
      Nominations.insert(nomination);
    }
  });
}
