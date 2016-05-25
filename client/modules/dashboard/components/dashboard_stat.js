import React from 'react';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import FlatButton from 'material-ui/FlatButton';
import { style } from './styles';


export default class DashBoardStat extends React.Component {
  _handleTouchTap() {
    const {navigate , path} = this.props;
    navigate(path);
  }

  render() {
    const { label, text, icon, number } = this.props;
    return (
      <Paper style={style.info.item}>
        <div style={style.info.itemContainer}>
          <FontIcon className={`fa fa-${icon}`} style={style.info.icon} />
          <div>{text}</div>
          <div style={style.info.number}>{number}</div>
        </div>
        <FlatButton
          style={style.info.button}
          label={label}
          labelPosition="before"
          onTouchTap={this._handleTouchTap.bind(this)}
        />
      </Paper>
    );
  }
}
