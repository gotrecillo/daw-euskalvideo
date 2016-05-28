import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/message';
import Spinner from '../../core/components/spinner';

export const composer = ({context, clearErrors, creatorId}, onData) => {
  const { Meteor } = context();
  if (creatorId === Meteor.userId()) {
    const creator = Meteor.users.findOne(creatorId);
    onData(null, { creator });
  } else if (Meteor.subscribe('user.profile', creatorId).ready()) {
    const creator = Meteor.users.findOne(creatorId);
    onData(null, { creator });
  }
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
