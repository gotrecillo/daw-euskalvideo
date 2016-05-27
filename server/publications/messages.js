import {Messages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';


export default function () {
  Meteor.publish('messages.list', function () {
    const date = new Date();

    const selector = {
      createdAt: { $gt: date },
    };

    const options = {
      fields: {_id: 1, text: 1, createdAt: 1, creator: 1, received: 1},
    };

    return Messages.find(selector, options);
  });
}
