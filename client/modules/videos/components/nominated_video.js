import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import VideoCore from './video_core';
import { styles } from './styles';


class NominatedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchingVideo: false,
      nominating: false,
      resizeHandler: this._updateDimensions.bind(this)
    };
  }

  componentWillMount() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.state.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.state.resizeHandler);
  }

  _updateDimensions() {
    this.setState({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }

  _handleStateChange(key, value) {
    this.setState({ [key]: value});
  }

  render() {
    const { video } = this.props;
    const { width, height, watchingVideo } = this.state;
    const fullWidhtDialog = height > width;
    return (
      <div>
        <Card style={styles.getCardStyle(width)}>
          <VideoCore
            video={video}
            fullWidhtDialog={fullWidhtDialog}
            watchingVideo={watchingVideo}
            closeHandler={this._handleStateChange.bind(this, 'watchingVideo', false)}
          />
          <CardActions>
            <FlatButton label="Ver" onTouchTap={this._handleStateChange.bind(this, 'watchingVideo', true)} />
            <FlatButton label="Nominar" onTouchTap={this._handleStateChange.bind(this, 'nominating', true)}/>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default NominatedVideo;
