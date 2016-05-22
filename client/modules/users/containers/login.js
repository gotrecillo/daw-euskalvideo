import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/login';
import configs from '../configs';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState, Meteor} = context();
  const error = LocalState.get('LOGIN_ERROR');
  const userId = Meteor.userId();
  const logging = Meteor.loggingIn();
  onData(null, {error, userId, logging});

  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  logInWith: actions.users.logInWith,
  navigate: actions.navigate.navigate,
  logIn: actions.users.logIn,
  clearErrors: actions.users.clearErrors,
  context: () => context,
  providers: configs.providers,
  inputs: configs.inputs,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
