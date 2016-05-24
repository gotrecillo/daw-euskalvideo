export default function ({Collections, Meteor}) {
  const {Likes} = Collections;

  Meteor.methods({
    'nominations.like'(idNomination) {
      const userId = Meteor.userId();
      check(idNomination, String);

      // DEMO
      // Meteor._sleepForMs(2000);

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
