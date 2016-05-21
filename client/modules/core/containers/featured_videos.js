import FeaturedVideos from '../components/featured_videos';
import {useDeps, composeWithTracker, composeAll} from 'mantra-core';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();
  if (Meteor.subscribe('videos.featured.list').ready()) {
    const videos = Collections.Videos.find().fetch();
    onData(null, {videos});
  }
};

export default composeAll(
  composeWithTracker(composer),
  useDeps()
)(FeaturedVideos);
