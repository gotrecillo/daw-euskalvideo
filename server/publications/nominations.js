import {Nominations} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

const getRandomId = () => {
  const totalNominations = Nominations.find().count();
  const random = Math.floor(Random.fraction() * totalNominations);
  const nomination = Nominations.findOne({},{
    skip: random
  });
  return nomination && nomination._id;
};

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

  Meteor.publish('nominations.random',function (random) {
    // We pass a random number so the pub/sub under the hood doesnt get cached
    check(random, Number);
    const _id = getRandomId();
    return Nominations.find({_id},{fields: {_id: 1, title: 1, likes: 1, createdAt: 1, creator: 1, youtubeId: 1, comment: 1, image: 1}});
  });

  Meteor.publish('nominations.count',function () {
    /* global Counts:true */
    Counts.publish(this, 'nominations', Nominations.find());
  });
}
