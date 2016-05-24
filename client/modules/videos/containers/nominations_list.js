import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/nominations_list';
import Spinner from '../../core/components/spinner';
import { formatNomination } from '../utils';

export const composer = ({context, clearErrors}, onData) => {
  const {Meteor, Collections, LocalState} = context();
  const limit = LocalState.get('NOMINATIONS_SHOWN') || 10;
  const sort = LocalState.get('NOMINATIONS_SORT') || {createdAt: -1};
  const subscription = Meteor.subscribe('nominations.list', limit, sort);
  let formatedNominations = [];

  if (subscription.ready()) {
    const options = {
      sort,
      limit,
    };
    const nominations = Collections.Nominations.find({}, options).fetch();
    formatedNominations = nominations.map(formatNomination);
    onData(null, {nominations: formatedNominations, loadedNominations: formatedNominations.length});
  }

  return clearErrors;
};

export const counterComposer = ({context, clearErrors}, onData) => {
  const {Meteor} = context();
  const subscription = Meteor.subscribe('nominations.count');
  if (subscription.ready()) {
    /* global Counts:true */
    const totalNominations = Counts.get('nominations');
    onData(null, {totalNominations});
  }
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
  composeWithTracker(counterComposer, Spinner),
  useDeps(depsMapper)
)(Component);
