import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/video_searcher';

export const composer = ({context, clearErrors}, onData) => {
  const {LocalState} = context();
  const error = LocalState.get('SEARCHING_ERROR');
  const searching = LocalState.get('SEARCHING_VIDEOS');
  const searchedVideos = LocalState.get('SEARCHED_VIDEOS') || [];
  const nominated = LocalState.get('CREATED_NOMINATION');

  onData(null, {error, searchedVideos, searching, nominated});
};

export const depsMapper = (context, actions) => ({
  search: actions.videos.searchInYoutube,
  clear: actions.nominations.clearCreatedNominationFlag,
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Component);
