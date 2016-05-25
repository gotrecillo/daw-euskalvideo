import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const lightMuiTheme = getMuiTheme(lightBaseTheme);

import Menu from '../containers/menu';

const Layout = ({content = () => null }) => (
  <MuiThemeProvider muiTheme={lightMuiTheme}>
    <div>
      <AppBar
        title="EK Videos"
        showMenuIconButton={false}
        iconElementRight={<Menu/>}
      />

      <div>
        {content()}
      </div>
    </div>
  </MuiThemeProvider>
);

export default Layout;
