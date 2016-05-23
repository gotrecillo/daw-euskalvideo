import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/nominations_list';
import Spinner from '../../core/components/spinner';

const formatNomination = nomination => {
  return Object.assign({}, nomination, {
    id: nomination.youtubeId,
    description: nomination.comment
  });
};

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const limit = LocalState.get('NOMINATIONS_SHOWN') || 10;
  const sort = LocalState.get('NOMINATIONS_SORT') || {createdAt: -1};
  if (Meteor.subscribe('nominations.list', limit, sort).ready()) {
    const options = {
      sort,
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
  sortByLikes: actions.nominations.sortByLikes,
  sortByDate: actions.nominations.sortByDate,
  context: () => context
});


export default composeAll(
  composeWithTracker(composer, Spinner),
  useDeps(depsMapper)
)(Component);
