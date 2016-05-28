import { grey300, grey400, grey500 } from 'material-ui/styles/colors';

export const styles = {
  containerInput: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '900px',
    padding: '1em',
    margin: '1em auto',
  },
  messagesContainer: {
    maxWidth: '900px',
    margin: '1em auto',
  },
  fontIcon: {
    lineHeight: '2em',
    margin: '0 1em'
  },
  textInput: {
    flexGrow: '20'
  },
  messageContainer: {
    padding: '0.5em 1em',
  },
  messageAvatar: {
    width: '40px',
    height: '40px',
    float: 'left',
    margin: '0.5em 0.5em 0 0'
  },
  messageBodyContainer: {
    margin: '0.5em 0',
  },
  messageCreator: {
    color: 'grey'
  },
  messageBody: {
    margin: '0.2em 0'
  },
  messageTime: {
    textAlign: 'right', color: grey500
  },
  messageSeparator: {
    margin: '0px',
    color: 'grey',
    border: `1px solid ${grey300}`
  },
  tick: {
    fontSize: '16px',
    marginRight: '0.5em',
    color: grey400,
  }
};
