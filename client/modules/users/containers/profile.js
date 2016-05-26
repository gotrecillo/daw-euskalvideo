import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Spinner from '../../core/components/spinner';
import Component from '../components/profile';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor} = context();
  const user = Meteor.user();
  const currentUser = Boolean(Meteor.user());
  const loggingIn = Meteor.loggingIn();
  onData(null, { user, loggingIn, currentUser });

  return clearErrors;
};


export const depsMapper = (context, actions) => ({
  updateProfile: actions.users.updateProfile,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
