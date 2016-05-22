import {Nominations} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('nominations.list', function () {
    const selector = {};
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Nominations.find(selector, options);
  });

  Meteor.publish('nomination.single', function (nominationId) {
    check(nominationId, String);
    const selector = {_id: nominationId};
    return Nominations.find(selector);
  });

}
