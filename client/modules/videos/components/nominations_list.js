import React from 'react';
import Paper from 'material-ui/Paper';
import NominatedVideo from './nominated_video';
import {styles} from './styles';
import { getDocHeight } from '../../../utils';

export default class NominationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.state.loadMoreHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.loadMoreHandler);
  }

  _loadMoreOnBottom() {
    const { loadMoreNominations } = this.props;
    if ($(window).scrollTop() + $(window).height() > getDocHeight() - 15) {
      loadMoreNominations();
    }
  }

  render() {
    const { nominations } = this.props;
    return (
      <Paper>
        <div style={styles.videoContainer}>
          {
            nominations.map(video => (<NominatedVideo key={video._id} video={video} />))
          }
        </div>
      </Paper>
    );
  }
}

