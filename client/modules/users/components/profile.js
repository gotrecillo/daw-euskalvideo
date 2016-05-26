import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Snackbar from 'material-ui/Snackbar';
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
      saving: false,
    };
  }

  componentWillMount() {
    this._updateDimensions();
  }

  componentDidMount() {
    window.addEventListener('resize', this.state.resizeHandler);
  }

  componentWillReceiveProps(newProps) {
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

  stopEditing() {
    this.setState({
      editing: false,
      name: this.props.user.profile.displayName,
      avatar: this.props.user.profile.imgUrl,
    });
  }

  render() {
    const { width, fileName, avatar, saved } = this.state;
    const avatarWidth = width <= 266 ? width - 66 : 200;
    const { editing } = this.state;

    const content = !editing ?
        <div>
          <CardTitle title={this.state.name}/>
          <RaisedButton style={{margin: '0.4em'}} label='Cambiar Contraseña' onTouchTap={this._handleEditButtonTouchTap.bind(this)}/>
          <RaisedButton style={{margin: '0.4em'}} label='Editar' onTouchTap={this._handleEditButtonTouchTap.bind(this)}/>
        </div> :
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
        </div>;

    return (
      <Card style={styles.cardContainer}>
        <Avatar
          size={avatarWidth}
          src={avatar}
          key={avatar}
        />
        {content}
        <Snackbar
          open={saved}
          message="Perfil actualizado"
          action="X"
          autoHideDuration={2000}
          onActionTouchTap={this._handleSnackRequestClose.bind(this)}
          onRequestClose={this._handleSnackRequestClose.bind(this)}
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
