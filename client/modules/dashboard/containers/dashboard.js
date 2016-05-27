import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/dashboard';
import Spinner from '../../core/components/spinner';
import { nominationsCounterComposer } from '../../videos/containers/nominations_list';


export const usersCounterComposer = ({context, clearErrors}, onData) => {
  const {Meteor} = context();
  const subscription = Meteor.subscribe('presence.online');
  if (subscription.ready()) {
    /* global Presences:true */
    const onlineUsers = Presences.find().count();
    onData(null, {onlineUsers});
  }
};

export const depsMapper = (context, actions) => ({
  navigate: actions.navigate.navigate,
  context: () => context,
});

export default composeAll(
  composeWithTracker(nominationsCounterComposer, Spinner),
  composeWithTracker(usersCounterComposer, Spinner),
  useDeps(depsMapper)
)(Component);
