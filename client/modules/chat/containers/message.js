import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/message';
import Spinner from '../../core/components/spinner';

export const composer = ({context, clearErrors, creatorId}, onData) => {
  const { Meteor } = context();
  const creator = Meteor.users.findOne(creatorId);
  onData(null, { creator });
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
