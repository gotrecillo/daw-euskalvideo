import React from 'react';

const FeaturedVideos = ({videos}) => (
  <div className='postlist'>
    <ul>
      {videos.map(video => (
        <li key={video._id}>
          {video.title}
        </li>
      ))}
    </ul>
  </div>
);

export default FeaturedVideos;
