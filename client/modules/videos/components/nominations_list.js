import React from 'react';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Spinner from '../../core/components/spinner';
import NominatedVideo from '../containers/nominated_video';
import {styles} from './styles';
import { getDocHeight } from '../../../utils';

export default class NominationsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMoreHandler: this._loadMoreOnBottom.bind(this),
      loading: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.state.loadMoreHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.state.loadMoreHandler);
  }

  componentWillReceiveProps() {
    this.setState({loading: false});
  }

  _handleLoadMoreButton() {
    const { loadMoreNominations } = this.props;
    this.setState({loading: true});
    loadMoreNominations();
  }

  _getLoadMoreButton() {
    const { loading } = this.state;
    const hasMore = this._hasMoreToLoad.bind(this)();
    return (hasMore && !loading) ?
      (<div style={styles.loadMoreContainer}>
        <RaisedButton primary onTouchTap={this._handleLoadMoreButton.bind(this)} label="Cargar mas" />
      </div>) :
      null;
  }

  _getSpinner() {
    const { loading } = this.state;
    return loading ? <Spinner/> : null;
  }

  _hasMoreToLoad() {
    const { loadedNominations, totalNominations} = this.props;
    return loadedNominations < totalNominations;
  }

  _loadMoreOnBottom() {
    const { loadMoreNominations } = this.props;
    const hasMore = this._hasMoreToLoad.bind(this)();
    if (($(window).scrollTop() + $(window).height() > getDocHeight() - 15) && hasMore) {
      this.setState({loading: true});
      loadMoreNominations();
    }
  }

  render() {
    const { nominations, sortByDate, sortByLikes } = this.props;
    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup style={styles.toolbarGroup} >
            <IconMenu
              iconButtonElement={
                <IconButton touch iconClassName="fa fa-sort" />
                }
            >
              <MenuItem onTouchTap={sortByDate} primaryText="Más nuevos" />
              <MenuItem onTouchTap={sortByLikes} primaryText="Más votados" />
            </IconMenu>
          </ToolbarGroup>
        </Toolbar>
        <Paper style={{paddingBottom: '1em'}}>
          <div style={styles.nominationsContainer}>
            {
              nominations.map(video => (<NominatedVideo key={video._id} idNomination={video._id} video={video} />))
            }
          </div>
          {this._getLoadMoreButton.bind(this)()}
          {this._getSpinner.bind(this)()}
        </Paper>
      </div>
    );
  }
}
