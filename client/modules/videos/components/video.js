import React from 'react';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import VideoCore from './video_core';
import { styles } from './styles';


class Video extends React.Component {
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

  _handleCreateNomination() {
    const { video, createNomination } = this.props;
    const { id, title, image } = video;
    const comment = this.refs.comment.getValue();
    createNomination(title, id, image, comment);
    this.setState({nominating: false});
  }


  _getNominateDialog() {
    const { video } = this.props;
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this._handleStateChange.bind(this, 'nominating', false)}
      />,
      <FlatButton
        label="Nominar"
        keyboardFocused
        onTouchTap={this._handleCreateNomination.bind(this)}
      />,
    ];

    return (
      <Dialog
          title="Nominar el video"
          actions={actions}
          open={this.state.nominating}
          onRequestClose={this._handleStateChange.bind(this, 'nominating', false)}
          >
          <h4>{`¿Quieres nominar el video: "${video.title}" ?`}</h4>
          <TextField
            ref="comment"
            fullWidth
            floatingLabelText="Dejanos tu comentario"
            multiLine={true}
            rows={4}
          />
      </Dialog>
    );
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
        { (() => this._getNominateDialog())() }
      </div>
    );
  }
}

export default Video;
