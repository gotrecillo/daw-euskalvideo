import {Nominations, Likes} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { validNominationComment } from './validations';

export default function () {
  Meteor.methods({
    'nominations.create'(title, youtubeId, image, comment = '') {
      const userId = Meteor.userId();
      const _id = Meteor.uuid();
      check(image, String);
      check(title, String);
      check(comment, validNominationComment);
      check(youtubeId, String);
      check(userId, String);

      const createdAt = new Date();
      const nomination = {_id, title, comment, youtubeId, createdAt, creator: userId, likes: 0, image};
      Nominations.insert(nomination);
    },

    'nominations.like'(idNomination) {
      const userId = Meteor.userId();
      check(idNomination, String);

      const like = {idNomination, userId};
      Likes.insert(like);
    },

    'nominations.unlike'(idNomination) {
      const userId = Meteor.userId();
      check(idNomination, String);

      const like = {idNomination, userId};
      Likes.remove(like);
    },

  });
}
