import {Likes} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('likes.single', function (idNomination) {
    check(idNomination, String);
    const selector = {idNomination};
    const options = {
      fields: {_id: 1, idNomination: 1},
    };

    return Likes.find(selector, options);
  });
}
