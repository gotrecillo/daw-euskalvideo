import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Spinner from '../../core/components/spinner';
import Component from '../components/profile';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, LocalState} = context();
  const user = Meteor.user();
  const currentUser = Boolean(Meteor.user());
  const loggingIn = Meteor.loggingIn();
  const error = LocalState.get('UPDATE_PASSWORD_ERROR');
  const updatedPassword = LocalState.get('UPDATED_PASSWORD');
  onData(null, { user, loggingIn, currentUser, error, updatedPassword });

  return clearErrors;
};

export const hasPasswordComposer = ({context, clearErrors}, onData) => {
  const {Meteor} = context();
  Meteor.call('user.userHasPassword', (err,result) => {
    if (result) {
      onData(null, {hasPassword: true});
    } else {
      onData(null, {hasPassword: false});
    }
  });
};

export const depsMapper = (context, actions) => ({
  updateProfile: actions.users.updateProfile,
  changePassword: actions.users.changePassword,
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  composeWithTracker(hasPasswordComposer, Spinner),
  useDeps(depsMapper)
)(Component);
