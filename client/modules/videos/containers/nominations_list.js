import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/nominations_list';

const formatNomination = nomination => {
  return Object.assign({}, nomination, {
    id: nomination.youtubeId,
    description: nomination.comment
  });
};

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const limit = LocalState.get('NOMINATIONS_SHOWN') || 10;
  if (Meteor.subscribe('nominations.list', limit).ready()) {
    const options = {
      sort: {createdAt: -1},
      limit,
    };
    const nominations = Collections.Nominations.find({}, options).fetch();
    const formatedNominations = nominations.map(formatNomination);
    onData(null, {nominations: formatedNominations});
  }
  return clearErrors;
};

export const depsMapper = (context, actions) => ({
  loadMoreNominations: actions.nominations.loadMoreNominations,
  clearErrors: actions.nominations.clearErrors,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
