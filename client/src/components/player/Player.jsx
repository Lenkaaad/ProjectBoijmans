import React, { Component } from 'react';
import PlayerJoin from './PlayerJoin';
import PlayerWaiting from './PlayerWaiting';
import {withRouter} from "react-router-dom";

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

      this.socket.on('leave request', () => {
        this.socket.emit('leave lobby');
        this.props.history.push('/');
      })
      
      this.socket.on('go game', lobby => {
        this.props.history.push('/game');
      })
    }

    leaveLobby = () => {
      if(this.state.screen > 0){
        this.socket.emit('leave lobby');
        this.props.history.push('/');
      }
    }

    changeScreens = () => {
      const newValue = this.state.screen + 1;

      this.setState({screen: newValue});
    }

    renderSwitch = (screen) => {
      switch (screen) {
        // case 0:
        //   return <PlayerJoin socket={this.socket} handleChangeScreens={this.changeScreens} />
        //   break;
        case 0: 
          return <PlayerWaiting socket={this.socket} lobby={this.state.lobby} />
        default:
          break;
      }
    }
    
    render() {
      return (
        <div className="player">
        <button onClick={this.leaveLobby}>leave lobby</button>
          <h1>Game Lobby</h1>
          {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default withRouter(Player);