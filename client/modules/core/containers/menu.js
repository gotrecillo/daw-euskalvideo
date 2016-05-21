import Menu from '../components/menu';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const { Meteor } = context();
  const userId = Meteor.userId();
  const admin = userIsAdmin(context());
  onData(null, {userId, admin});
};

const userIsAdmin = ({Meteor, Roles}) => {
  const loggedInUser = Meteor.user();
  return Roles.userIsInRole(loggedInUser, [ 'admin' ], 'admin');
};

export const depsMapper = (context, actions) => ({
  logout: actions.users.logout,
  navigate: actions.navigate.navigate,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Menu);
