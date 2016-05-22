import {Nominations} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('nominations.list', function (limit) {
    check(limit, Number);
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1, likes: 1, createdAt: 1, creator: 1, youtubeId: 1, comment: 1, image: 1},
      sort: {createdAt: -1},
      limit
    };

    return Nominations.find(selector, options);
  });

  Meteor.publish('nomination.single', function (nominationId) {
    check(nominationId, String);
    const selector = {_id: nominationId};
    return Nominations.find(selector);
  });

}
