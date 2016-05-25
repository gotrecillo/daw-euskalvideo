import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import { loggedItems } from '../configs/menu_items';

export default class Menu extends React.Component {

  render() {
    const {userId, logout, navigate, admin} = this.props;

    const loggedMenuItems = userId ?
      loggedItems.map(item =>
        <MenuItem key={item.text} primaryText={item.text} onTouchTap={navigate.bind(this, item.path)} />
        ) : null;

    const LogButton = userId ?
      <MenuItem primaryText="Log out" onTouchTap={logout} /> :
      <MenuItem primaryText="Log in" onTouchTap={navigate.bind(this, 'login')} />;

    const AdminButton = admin ?
      <MenuItem primaryText="Admin" onTouchTap={navigate.bind(this, 'login')} /> :
      null;

    return (
      <IconMenu
        iconButtonElement={<IconButton iconStyle={{color: 'white'}} iconClassName="fa fa-ellipsis-v" />}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        { loggedMenuItems }
        { AdminButton }
        { LogButton }
      </IconMenu>
      );
  }
}
