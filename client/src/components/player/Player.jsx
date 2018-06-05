import React, { Component } from 'react';
import PlayerJoin from './PlayerJoin';
import PlayerWaiting from './PlayerWaiting';

class Player extends Component {

    // constructor(props) {
    //   super(props);
    // }
    
    render() {
      return (
        <div className="player">
          <h1>Game Lobby</h1>
          {/* switch in plaatsen */}
          <PlayerJoin />
          <PlayerWaiting />
        </div>
      );
    }
  }
  
  export default Player;