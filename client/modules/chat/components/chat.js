import React from 'react';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import { styles } from './styles';

const Chat = ({messages}) => (
  <div>
    <div style={styles.messagesContainer}
      >
      {
        messages.map(message => <p key={message._id}>Caca{message.text}</p>)
      }
    </div>
    <Paper style={styles.containerInput}>
      <TextField
        style={styles.textInput}
        fullWidth
        hintText="Escribir mensaje"
      />
        <IconButton style={styles.fontIcon} iconClassName="fa fa-send" touch />
    </Paper>
  </div>
);

export default Chat;
