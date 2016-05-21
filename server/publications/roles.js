import { Meteor } from 'meteor/meteor';

export default () => {
  Meteor.publish(null, function () {
    return Meteor.roles.find({});
  });
};

