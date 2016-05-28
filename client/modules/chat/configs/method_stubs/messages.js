export default function ({Collections, Meteor}) {
  const {Messages} = Collections;

  Meteor.methods({
    'message.create'(text) {
      const userId = Meteor.userId();
      check(userId, String);
      check(text, String);
      const createdAt = new Date();
      const message = { creator: userId, text, createdAt, received: false };
      Messages.insert(message);
    },
  });
}
