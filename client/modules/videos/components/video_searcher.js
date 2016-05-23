import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
import Video from '../containers/video';
import Spinner from '../../core/components/spinner';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { debounce } from 'lodash';
import { styles } from './styles';

export default class VideoSearcher extends React.Component {
  constructor(props) {
    super(props);
    const search = debounce(props.search, 1000);
    this.state = { searchTerm: '', search };
  }

  _handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.refs.search.blur();
    }
    if (e.keyCode === 13) {
      this.refs.search.blur();
      this._searchTerm.bind(this)();
    }
  }

  _handleSearchTap() {
    this._searchTerm.bind(this)();
  }

  _searchTerm() {
    const searchTerm = this.refs.search.getValue();
    this.state.search(searchTerm);
  }

  _handleCloseSnack() {
    const { clear } = this.props;
    clear();
  }

  render() {
    const { searchedVideos, searching, nominated } = this.props;

    return (
      <Paper style={styles.paper}>
        <Card>
          <CardText style={styles.container}>
            <FontIcon style={styles.fontIcon} className="fa fa-search" />
            <TextField
              ref="search"
              style={styles.textInput}
              hintText="Busca un video"
              onKeyDown={this._handleKeyDown.bind(this)}
            />
          </CardText>
          <CardText style={styles.container}>
            <FloatingActionButton onTouchTap={this._handleSearchTap.bind(this)}>
              <FontIcon className="fa fa-search" />
            </FloatingActionButton>
          </CardText>
        </Card>
        <div style={styles.videoContainer}>
          {
            searchedVideos.map(video => (<Video key={video.id} video={video} />))
          }
        </div>
          {
            (() => searching ? <Spinner/> : null)()
          }
        <Snackbar
          open={nominated || false}
          message="Video nominado correctamente"
          action="Ok"
          onActionTouchTap={this._handleCloseSnack.bind(this)}
          onRequestClose={this._handleCloseSnack.bind(this)}
        />
      </Paper>
    );
  }
}

