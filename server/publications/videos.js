import { Videos } from '/lib/collections';
import { Meteor } from 'meteor/meteor';

export default function () {
  Meteor.publish('videos.featured.list', function () {
    const selector = {
      featured: 1
    };
    const options = {
      fields: {_id: 1, title: 1},
      sort: {createdAt: -1},
      limit: 10
    };

    return Videos.find(selector, options);
  });

}
