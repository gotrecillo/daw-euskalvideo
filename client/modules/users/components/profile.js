import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import { styles } from './styles';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resizeHandler: this._updateDimensions.bind(this),
      editing: false,
      name: 'Peter Pan',
      fileName: 'Elige un avatar',
      avatar: 'http://lorempixel.com/100/100/nature/',
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

  _handleEditButtonTouchTap() {
    this.setState({editing: true});
  }

  _handleFileButtonTouchTap() {
    this.refs.avatar.click();
  }

  _handleRequestSaveSettings() {
    console.log('save');
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

  stopEditing() {
    this.setState({
      editing: false,
      name: 'Peter Pan',
      avatar: 'http://lorempixel.com/100/100/nature/',
    });
  }

  render() {
    const { width, fileName, avatar } = this.state;
    const avatarWidth = width <= 266 ? width - 66 : 200;
    const { editing } = this.state;

    const content = !editing ?
        <div>
          <CardTitle title={this.state.name}/>
          <RaisedButton label='Editar' onTouchTap={this._handleEditButtonTouchTap.bind(this)}/>
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
        />
        {content}
      </Card>
    );
  }

}
