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

  _handleKeyDown(e) {
    if (e.keyCode === 27) {
      return this._stopNominating.bind(this)();
    }
    if (e.keyCode === 13) {
      return this._handleCreateNomination.bind(this)();
    }
  }

  _handleCommentChange() {
    const commentLength = this.refs.comment.getValue().length;
    if (commentLength === 140) {
      this.setState({errorText: 'Alcanzado máximo de 140 carácteres'});
    } else if (this.state.errorText) {
      this.setState({errorText: false});
    }
  }

  _stopNominating() {
    this.setState({
      nominating: false,
      errorText: false
    });
  }

  _handleCreateNomination() {
    const { video, createNomination } = this.props;
    const { id, title, image } = video;
    const comment = this.refs.comment.getValue();
    createNomination(title, id, image, comment);
    this._stopNominating.bind(this)();
  }


  _getNominateDialog() {
    const { video } = this.props;
    const { errorText } = this.state;
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
          onRequestClose={this._stopNominating.bind(this)}
          >
          <h4>{`¿Quieres nominar el video: "${video.title}" ?`}</h4>
          <TextField
            ref="comment"
            fullWidth
            floatingLabelText="Dejanos tu comentario"
            multiLine={true}
            rows={4}
            maxLength="140"
            errorText={errorText}
            onChange={this._handleCommentChange.bind(this)}
            onKeyDown={this._handleKeyDown.bind(this)}
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
