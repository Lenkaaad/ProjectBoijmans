import React, { Component } from 'react';
import PlayerJoin from './PlayerJoin';
import PlayerWaiting from './PlayerWaiting';

class Player extends Component {

    constructor(props) {
      super(props);

      this.state = {
        screen: 0,
        lobby: null
      }

      this.socket = this.props.socket;
    }

    componentDidMount() {
      this.socket.on('lobby', lobby => {
        this.setState({lobby: lobby});
      });
    }

    changeScreens = () => {
      const newValue = this.state.screen + 1;

      this.setState({screen: newValue});
    }

    renderSwitch = (screen) => {
      switch (screen) {
        case 0:
          return <PlayerJoin socket={this.socket} handleChangeScreens={this.changeScreens} />
          break;
        case 1: 
          return <PlayerWaiting socket={this.socket} lobby={this.state.lobby} />
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