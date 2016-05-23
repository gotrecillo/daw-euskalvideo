import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import VideoCore from './video_core';
import { styles } from './styles';


class NominatedVideo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      watchingVideo: false,
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

  _handleLike() {
    const { like, unlike, liked, idNomination} = this.props;
    return liked ? unlike(idNomination) : like(idNomination);
  }

  render() {
    const { video, liked } = this.props;
    const { width, height, watchingVideo } = this.state;
    const fullWidhtDialog = height > width;
    const { likes } = video;
    const formatedLikes = likes === 0 ? 0 : `+${likes}`;
    const likeIcon = liked ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up';
    return (
      <div>
        <Card style={styles.getCardStyle(width)}>
          <VideoCore
            video={video}
            fullWidhtDialog={fullWidhtDialog}
            watchingVideo={watchingVideo}
            closeHandler={this._handleStateChange.bind(this, 'watchingVideo', false)}
          />
          <CardActions style={{textAlign: 'right'}}>
            <FlatButton label="Ver" onTouchTap={this._handleStateChange.bind(this, 'watchingVideo', true)} />
            <FlatButton
              onTouchTap={this._handleLike.bind(this)}
              icon={<FontIcon className={likeIcon} />}
            />
            <span>
            {formatedLikes}
            </span>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default NominatedVideo;
