import { red500, red600, indigo800, indigo700, lightBlue500, lightBlue600 } from 'material-ui/styles/colors';

export const social = [
  { 
    icon: 'twitter',
    color: lightBlue500,
    hoverColor: lightBlue600, 
    getUrl: () => {
      return 'https://twitter.com/intent/tweet?url=' + window.location.href + '&text=Visita+Euskal+Videos';
    }
  },
  { 
    icon: 'facebook',
    color: indigo800,
    hoverColor: indigo700,
    getUrl: () => {
      return 'https://www.facebook.com/sharer/sharer.php?&u=' + window.location.href;
    }
  },
  { 
    icon: 'google',
    color: red500,
    hoverColor: red600,
    getUrl: () => {
      return 'https://plus.google.com/share?url=' + window.location.href;
    }
  }
];
