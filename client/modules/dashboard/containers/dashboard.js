import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/dashboard';
import Spinner from '../../core/components/spinner';
import { counterComposer } from '../../videos/containers/nominations_list';


export const depsMapper = (context, actions) => ({
  navigate: actions.navigate.navigate,
  context: () => context,
});

export default composeAll(
  composeWithTracker(counterComposer, Spinner),
  useDeps(depsMapper)
)(Component);
