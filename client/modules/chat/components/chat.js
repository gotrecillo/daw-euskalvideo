import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Message from '../containers/message';
import { styles } from './styles';

export default class Chat extends React.Component {
  _handleTouchTap() {
    const { createMessage } = this.props;
    const message = this.refs.message.getValue();
    createMessage(message);
  }

  render() {
    const { messages } = this.props;
    return (
      <div>
        <Paper style={styles.containerInput}>
          <TextField
            ref="message"
            style={styles.textInput}
            fullWidth
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
