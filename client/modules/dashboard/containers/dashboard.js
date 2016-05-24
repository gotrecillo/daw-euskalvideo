import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/dashboard';
import Spinner from '../../core/components/spinner';
import { formatNomination } from '../../videos/utils';

const suscribeToRandomNominations = (Meteor, Nominations, onData) => (
  Meteor.subscribe('nominations.random', Random.fraction(), function () {
    const nominations = Nominations.find().fetch();
    const formatedNominations = nominations.map(formatNomination);
    onData(null, {nomination: formatedNominations});
  }));

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections} = context();
  const {Nominations} = Collections;

  // Load the first nomination at the start and get the handler to stop the sub
  let handler = suscribeToRandomNominations(Meteor, Nominations, onData);

  const interval = Meteor.setInterval(function () {
    handler.stop();
    handler = suscribeToRandomNominations(Meteor, Nominations, onData);
  }, 10000);

  const cleanUp = () => {
    Meteor.clearInterval(interval);
    handler.stop();
  };

  return cleanUp;

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
