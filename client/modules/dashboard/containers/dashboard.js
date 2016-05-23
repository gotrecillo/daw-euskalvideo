import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/dashboard';
import Spinner from '../../core/components/spinner';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();
  onData(null, {liked: false});
};

export const depsMapper = (context, actions) => ({
  like: actions.nominations.like,
  unlike: actions.nominations.unlike,
  clearErrors: actions.nominations.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
