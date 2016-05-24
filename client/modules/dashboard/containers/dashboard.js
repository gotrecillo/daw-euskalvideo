import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/dashboard';
import Spinner from '../../core/components/spinner';
import { formatNomination } from '../../videos/utils';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();
  const {Nominations} = Collections;
  Meteor.subscribe('nominations.random', Random.fraction(), function () {
    const nomination = Nominations.find().fetch();
    const formatedNomination = formatNomination(nomination);
    onData(null, {nomination: formatedNomination});
  });
  onData(null, {});
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
