import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import {styles} from './styles';

const Message = ({message, creator}) => (
  <div>
    <div style={styles.messageContainer}>
      <Avatar style={styles.messageAvatar} src={creator.profile.imgUrl} />
      <div style={styles.messageBodyContainer}>
        <div style={styles.messageBody}>{message.text}</div>
        <div style={styles.messageTime}>
          <FontIcon style={styles.tick} className={message.received ? 'fa fa-check-square-o' : 'fa fa-square-o'} />
          {moment(message.createdAt).format('HH:mm')}
        </div>
      </div>
    </div>
    <hr style={styles.messageSeparator}/>
  </div>
);

export default Message;


