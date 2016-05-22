import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/video';

export const composer = ({context, clearErrors}, onData) => {
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  createNomination: actions.nominations.createNomination,
  clearErrors: actions.nominations.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
