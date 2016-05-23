import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/nominated_video';

export const composer = ({context, clearErrors, idNomination}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('likes.single', idNomination).ready()) {
    if (Collections.Likes.findOne({idNomination})) {
      onData(null, {liked: true});
    }else {
      onData(null, {liked: false});
    }
  }
};

export const depsMapper = (context, actions) => ({
  like: actions.nominations.like,
  unlike: actions.nominations.unlike,
  clearErrors: actions.nominations.clearErrors,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
