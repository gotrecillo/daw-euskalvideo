import React from 'react';
import NominatedVideo from '../../videos/containers/nominated_video';

export default class DashBoard extends React.Component {
  render() {
    const {nomination} = this.props;
    return (
      <div>
        <NominatedVideo key={nomination._id} idNomination={nomination._id} video={nomination} />
      </div>
    );
  }
}
