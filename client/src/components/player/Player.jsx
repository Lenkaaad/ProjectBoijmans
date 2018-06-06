import React, { Component } from 'react';
import PlayerJoin from './PlayerJoin';
import PlayerWaiting from './PlayerWaiting';

class Player extends Component {

    constructor(props) {
      super(props);

      this.state = {
        screen: 0
      }

      this.socket = this.props.socket;
      console.log(this.props.state);
    }

    renderSwitch = (screen) => {
      switch (screen) {
        case 0:
          return <PlayerJoin/>
          break;
        case 1: 
          return <PlayerWaiting />
        default:
          break;
      }
    }
    
    render() {
      return (
        <div className="player">
          <h1>Game Lobby</h1>
          {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default Player;