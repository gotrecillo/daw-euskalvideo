import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { styles } from './styles';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resizeHandler: this._updateDimensions.bind(this),
      editing: false,
      name: props.user.profile.displayName,
      fileName: 'Elige un avatar',
      avatar: props.user.profile.imgUrl,
      saved: false,
      savedPassword: false,
      saving: false,
      changingPasswordModalOpen: false,
      passwordConfirmError: false,
    };
  }

  componentWillMount() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.state.resizeHandler);
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.user) {
      return; // No warning if logging out
    }

    if (newProps.updatedPassword) {
      this.setState(
        {
          changingPasswordModalOpen: false,
          savedPassword: true
        }
      );
    }

    const newState = (this.state.saving) ?
      {
        name: newProps.user.profile.displayName,
        avatar: newProps.user.profile.imgUrl,
        saved: true,
        saving: false,
      } : {
        name: newProps.user.profile.displayName,
        avatar: newProps.user.profile.imgUrl,
        saved: false,
        saving: false,
      };

    this.setState(newState);
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

  _handleEditButtonTouchTap() {
    this.setState({editing: true});
  }

  _handleFileButtonTouchTap() {
    this.refs.avatar.click();
  }

  _handleRequestSaveSettings() {
    const { updateProfile } = this.props;
    const { avatar } = this.state;
    const name = this.refs.displayName.getValue();
    this.setState({editing: false, saving: true});
    updateProfile(avatar, name);
  }

  _handleRequestCancelSettings() {
    this.stopEditing();
  }

  _handleFileChange() {
    const fileName = this.refs.avatar.value.split(/(\\|\/)/g).pop();
    this.setState({fileName});
    const reader = new FileReader();
    const file = this.refs.avatar.files[0];
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result
      });
    };

    reader.readAsDataURL(file);
  }

  _handleSnackRequestClose() {
    this.setState({ saved: false});
  }

  _handlePassSnackRequestClose() {
    this.setState({savedPassword: false});
  }

  _handleChangePasswordButtonTouchTap() {
    this.setState({
      changingPasswordModalOpen: true,
    });
  }

  _stopChangingPassword() {
    this.setState({
      changingPasswordModalOpen: false,
    });
  }

  _startSubmitingPassword() {
    const { changePassword } = this.props;
    const oldPassword = this.refs.oldPassword.getValue();
    const newPassword = this.refs.newPassword.getValue();
    const confirmPassword = this.refs.confirmPassword.getValue();
    if (newPassword !== confirmPassword) {
      this.setState({passwordConfirmError: 'Las contraseñas deben coincidir'});
    } else {
      this.setState({passwordConfirmError: false});
      changePassword(oldPassword, newPassword);
    }
  }

  stopEditing() {
    this.setState({
      editing: false,
      name: this.props.user.profile.displayName,
      avatar: this.props.user.profile.imgUrl,
    });
  }

  _getContent() {
    const { editing, fileName } = this.state;
    const { hasPassword } = this.props;
    const changePasswordButton = hasPassword ?
      <RaisedButton
        style={{margin: '0.4em'}}
        label='Cambiar Contraseña'
        onTouchTap={this._handleChangePasswordButtonTouchTap.bind(this)}/> :
      null;

    if (!editing) {
      return (<div>
          <CardTitle title={this.state.name}/>
            { changePasswordButton }
          <RaisedButton style={{margin: '0.4em'}} label='Editar' onTouchTap={this._handleEditButtonTouchTap.bind(this)}/>
        </div>);
    }

    if (editing) {
      return (
        <div style={styles.surnameTitle}>
          <TextField
            ref="displayName"
            hintText="Apodo"
            defaultValue={this.state.name}
            floatingLabelText="Apodo"
            fullWidth
          />
          <div style={styles.formContainer}>
            <TextField
              ref="fileName"
              style={styles.fileNameInput}
              hintText={fileName}
              value={fileName}
              underlineDisabledStyle={styles.underlineDisabled}
              disabled
              />
            <input
              style={styles.hidden}
              onChange={this._handleFileChange.bind(this)}
              ref="avatar"
              type="file"
              accept=".png"/>
            <IconButton
              style={styles.fileIcon}
              iconClassName="fa fa-paperclip"
              onTouchTap={this._handleFileButtonTouchTap.bind(this)}
              />
          </div>
          <RaisedButton
            onTouchTap={this._handleRequestSaveSettings.bind(this)}
            style={styles.button}
            primary
            label="Guardar"/>
          <RaisedButton
            onTouchTap={this._handleRequestCancelSettings.bind(this)}
            primary
            style={styles.button}
            label="Cancelar"/>
        </div>
      );
    }
  }

  render() {
    const { error } = this.props;
    const { width, avatar, saved, changingPasswordModalOpen, passwordConfirmError, savedPassword } = this.state;
    const avatarWidth = width <= 266 ? width - 66 : 200;

    const content = this._getContent.bind(this)();

    const passwordActions = [
      <FlatButton
        label="Cancelar"
        primary
        onTouchTap={this._stopChangingPassword.bind(this)}
      />,
      <FlatButton
        label="Cambiar"
        primary
        onTouchTap={this._startSubmitingPassword.bind(this)}
      />,
    ];

    return (
      <Card style={styles.cardContainer}>
        <Avatar
          size={avatarWidth}
          src={avatar}
          key={avatar}
        />
        {content}
        <Dialog
          title="Cambiar Contraseña"
          actions={passwordActions}
          modal={false}
          open={changingPasswordModalOpen}
          onRequestClose={this._stopChangingPassword.bind(this)}
        >
          <TextField
            hintText="Contraseña actual"
            ref="oldPassword"
            fullWidth
            floatingLabelText="Contraseña actual"
            type="password"
          />
          <TextField
            hintText="Contraseña nueva"
            ref="newPassword"
            errorText={passwordConfirmError}
            fullWidth
            floatingLabelText="Contraseña nueva"
            type="password"
          />
          <TextField
            hintText="Confirmar contraseña"
            ref="confirmPassword"
            errorText={passwordConfirmError}
            fullWidth
            floatingLabelText="Confirmar contraseña"
            type="password"
          />
          <div style={{textAlign: 'center', color: 'red'}}>
            {error}
          </div>
        </Dialog>
        <Snackbar
          open={saved}
          message="Perfil actualizado"
          action="X"
          autoHideDuration={2000}
          onActionTouchTap={this._handleSnackRequestClose.bind(this)}
          onRequestClose={this._handleSnackRequestClose.bind(this)}
        />
        <Snackbar
          open={savedPassword}
          message="Contraseña actualizada"
          action="X"
          autoHideDuration={2000}
          onActionTouchTap={this._handlePassSnackRequestClose.bind(this)}
          onRequestClose={this._handlePassSnackRequestClose.bind(this)}
        />
      </Card>
    );
  }

}

Profile.defaultProps = {
  user: {
    profile: {
      displayName: 'Loading...',
      imageUrl: 'http://www.oalaska.com/wp-content/themes/pointfinder/images/empty_avatar.jpg',
    }
  }
};
