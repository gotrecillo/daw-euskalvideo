import React from 'react';
import Video from '../../videos/containers/video';

const FeaturedVideos = ({videos}) => (
  <div className='postlist'>
    <ul>
      {videos.map(video => (
        <Video key={video._id} video={video}/>
      ))}
    </ul>
  </div>
);

export default FeaturedVideos;
