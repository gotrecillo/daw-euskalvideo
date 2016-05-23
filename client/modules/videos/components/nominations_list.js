import React from 'react';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import NominatedVideo from '../containers/nominated_video';
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
    const { nominations, sortByDate, sortByLikes } = this.props;
    return (
      <div>
        <Toolbar style={styles.toolbar}>
          <ToolbarGroup style={{marginRight: '-14px'}} >
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
      <Paper>
        <div style={styles.nominationsContainer}>
          {
            nominations.map(video => (<NominatedVideo key={video._id} idNomination={video._id} video={video} />))
          }
        </div>
      </Paper>
      </div>
    );
  }
}
