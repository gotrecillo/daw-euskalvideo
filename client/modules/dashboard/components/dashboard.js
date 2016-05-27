import React from 'react';
import DashBoardStat from './dashboard_stat';
import { style } from './styles';


export default class DashBoard extends React.Component {
  render() {
    const { totalNominations, onlineUsers, navigate } = this.props;
    return (
      <div style={style.info.container}>
        <DashBoardStat
          icon="fire"
          text="Videos nominados:"
          label="vota"
          path='/app/nominations'
          navigate={navigate}
          number={totalNominations}
        />
        <DashBoardStat
          icon="users"
          text="Usuarios conectados:"
          label="chatea"
          path='/app/nominations'
          navigate={navigate}
          number={onlineUsers}
        />
        <DashBoardStat
          icon="video-camera"
          text="Videos collecionados:"
          label="ver"
          path='/app/nominations'
          navigate={navigate}
          number={totalNominations}
        />
      </div>
    );
  }
}
