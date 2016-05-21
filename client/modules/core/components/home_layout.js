import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

const Layout = ({content = () => null }) => (
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    {content()}
  </MuiThemeProvider>
);

export default Layout;
