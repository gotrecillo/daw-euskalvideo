import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Message from '../containers/message';
import { styles } from './styles';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: ''};
  }

  _handleKeyDown(e) {
    if (e.keyCode === 27) {
      this.refs.message.blur();
    }
    if (e.keyCode === 13) {
      this.refs.message.blur();
      this._createMessage.bind(this)();
    }
  }

  _handleChange(event) {
    this.setState({
      message: event.target.value,
    });
  }
  _handleTouchTap() {
    this._createMessage.bind(this)();
  }

  _createMessage() {
    const { createMessage } = this.props;
    const message = this.refs.message.getValue();
    createMessage(message);
    this.setState({ message: '' });
  }

  render() {
    const { messages } = this.props;
    const { message } = this.state;
    return (
      <div>
        <Paper style={styles.containerInput}>
          <TextField
            ref="message"
            onKeyDown={this._handleKeyDown.bind(this)}
            style={styles.textInput}
            fullWidth
            value={message}
            onChange={this._handleChange.bind(this)}
            maxLength="140"
            hintText="Escribir mensaje"

          />
            <IconButton
              onTouchTap={this._handleTouchTap.bind(this)}
              style={styles.fontIcon}
              iconClassName="fa fa-send"
              touch />
        </Paper>
        <Paper style={styles.messagesContainer}>
          {
            messages.map(message => <Message creatorId={message.creator} key={message._id} message={message} />)
          }
        </Paper>
      </div>
      );
  }
}
