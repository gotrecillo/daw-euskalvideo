import { deepPurple900, blue400, cyan100, deepOrange800 } from 'material-ui/styles/colors';

export const styles = {
  feature: {
    container: {
      alignItems: 'center',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginTop: '4em',
    },
    item: {
      flexGrow: '0',
      margin: '1em',
      minHeight: '300px',
      textAlign: 'center',
      width: '333px',
    },
    text: {
      textAlign: 'justify',
    },
    title: {
      color: deepPurple900,
    },
    icon: {
      fontSize: '3em',
    }
  },
  button: {
    backgroundColor: blue400,
    color: 'white',
    container: {
      textAlign: 'center',
    }
  },
  slider: {
    paper: {
      maxWidth: '90%',
      border: `solid 5px ${blue400}`,
      textAlign: 'center',
      padding: '1em',
      fontSize: '2.5em',
      backgroundColor: 'rgba(255, 255, 255, .8)',
    }
  },
  footer: {
    container: {
      textAlign: 'center',
      backgroundColor: cyan100,
      marginTop: '4em'
    },
    link: {
      color: deepOrange800,
      fontWeight: 'bolder',
      textDecoration: 'none',
    },
  }
};


export const getSliderStyles = (height) => ({
  height,
  textAlign: 'center',
  color: 'white',
  background: 'url(/images/home/home.jpg) no-repeat center center fixed',
  backgroundSize: 'cover',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
