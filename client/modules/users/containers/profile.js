import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Spinner from '../../core/components/spinner';
import Component from '../components/profile';

export const composer = ({context, clearErrors}, onData) => {
  onData(null, {});

  return clearErrors;
};

export const depsMapper = (context) => ({
  context: () => context,
});

export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
