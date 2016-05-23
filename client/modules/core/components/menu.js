import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';

export default class Menu extends React.Component {

  render() {
    const {userId, logout, navigate, admin} = this.props;

    const LogButton = userId ?
      <MenuItem primaryText="Log out" onTouchTap={logout} /> :
      <MenuItem primaryText="Log in" onTouchTap={navigate.bind(this, 'login')} />;

    const VideosButton = userId ?
      <MenuItem primaryText="Inicio" onTouchTap={navigate.bind(this, 'app')} /> :
      null;

    const NominateButton = userId ?
      <MenuItem primaryText="Proponer" onTouchTap={navigate.bind(this, 'app/nominate')} /> :
      null;

    const NominationsButton = userId ?
      <MenuItem primaryText="Nominaciones" onTouchTap={navigate.bind(this, 'app/nominations')} /> :
      null;

    const AdminButton = admin ?
      <MenuItem primaryText="Admin" onTouchTap={navigate.bind(this, 'login')} /> :
      null;

    return (
      <IconMenu
        iconButtonElement={<IconButton iconStyle={{color: 'white'}} iconClassName="fa fa-ellipsis-v" />}
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
      >
        { VideosButton }
        { NominateButton }
        { NominationsButton }
        { AdminButton }
        { LogButton }
      </IconMenu>
      );
  }
}
