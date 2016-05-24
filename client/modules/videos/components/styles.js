export const styles = {
  dialog: { textAlign: 'center' },
  getCardStyle: deviceWidth => {
    const cardWidth = deviceWidth > 400 ? 400 : deviceWidth - 30;
    const minHeight = deviceWidth > 850 ? '450px' : 0;
    return {
      margin: '1em',
      width: `${cardWidth}px`,
      minHeight
    };
  },
  thumb: { maxHeight: '300px', width: '100%'},
  paper: { padding: '1em 1em 2em 1em' },
  container: { display: 'flex', justifyContent: 'center' },
  fontIcon: { lineHeight: '2em', marginRight: '1em' },
  textInput: { flexGrow: '20' },
  videoContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '3em',
  },
  videoDescription: {
    overflow: 'auto',
    padding: '5px 0 5px 5px',
    height: '60px',
    borderRight: 'solid 5px rgba(0,0,0,0)',
  },
  nominationsContainer: {
    alignItems: 'center',
    padding: '0 0 7em 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  video: {
    flexGrow: '0',
    margin: '1em',
    width: '400px',
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  toolbarGroup: {
    marginRight: '-14px',
  },
  loadMoreContainer: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '1em',
  }
};
