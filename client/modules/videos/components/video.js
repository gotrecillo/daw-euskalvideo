import React from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import ImageWithPlaceholder from '../../core/components/image_with_placeholder';
import { truncate } from 'lodash';
import logo from '../configs/logo64';

const styles = {
  dialog: { textAlign: 'center' },
  getCardStyle: deviceWidth => {
    const cardWidth = deviceWidth > 400 ? 400 : deviceWidth - 30;
    const minHeight = deviceWidth > 850 ? '450px' : 0;
    return {
      margin: '1em',
      width: `${cardWidth}px`,
      minHeight
    };
  },
};

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

  _handleShowVideo() {
    this.setState({watchingVideo: true});
  }

  _handleHideVideo() {
    this.setState({watchingVideo: false});
  }

  _handleNominate() {
    this.setState({nominating: true});
  }

  _handleHideNominate() {
    this.setState({nominating: false});
  }

  _handleCreateNomination() {
    const { video, createNomination } = this.props;
    const { id, title } = video;
    const comment = this.refs.comment.getValue();
    createNomination(title, id, comment);
    this.setState({nominating: false});
  }

  _getPreview() {
    const { video } = this.props;
    const { id } = video;
    const dialogWidth = (this.state.height > this.state.width) ? '100%' : '50%';
    return (
      <Dialog
        style={styles.dialog}
        contentStyle={{width: dialogWidth}}
        open={this.state.watchingVideo}
        onRequestClose={this._handleHideVideo.bind(this)}
        autoScrollBodyContent
        >
        <div className="embed-container">
          <iframe
            id="ytplayer"
            type="text/html"
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder="0"
          />
        </div>
      </Dialog>
    );
  }

  _getNominateDialog() {
    const { video } = this.props;
    const actions = [
      <FlatButton
        label="Cancelar"
        onTouchTap={this._handleHideNominate.bind(this)}
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
          onRequestClose={this._handleHideNominate.bind(this)}
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
    const { width } = this.state;
    return (
      <div>
        <Card style={styles.getCardStyle(width)}>
           <CardMedia
            overlay={<CardTitle title={truncate(video.title, {separator: ' '})} />}
            >
            <ImageWithPlaceholder
              src={video.image}
              placeholderSrc={logo}
              alt="youtube thumb image"
              />
          </CardMedia>
          <CardText>
            <div style={{overflowX: 'auto', padding: '5px 0 5px 5px', borderRight: 'solid 5px rgba(0,0,0,0)'}}>
              {video.description}
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Ver" onTouchTap={this._handleShowVideo.bind(this)} />
            <FlatButton label="Nominar" onTouchTap={this._handleNominate.bind(this)}/>
          </CardActions>
        </Card>
        { (() => this._getPreview())() }
        { (() => this._getNominateDialog())() }
      </div>
    );
  }
}

export default Video;
