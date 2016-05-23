import {Nominations} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('nominations.list', function (limit, sort) {
    check(limit, Number);
    check(sort, Object);
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1, likes: 1, createdAt: 1, creator: 1, youtubeId: 1, comment: 1, image: 1},
      sort,
      limit
    };

    return Nominations.find(selector, options);
  });
}
