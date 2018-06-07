import React, { Component } from 'react';
import GameRonde from './GameRonde';
import StemRonde from './StemRonde';
import GameWinner from './GameWinner';
import PickerWait from './PickerWait';

class Game extends Component {

    constructor(props) {
      super(props);

      this.state = {
        screen: 0,
        lobby: null,
        winScreen: false,
        ronde: null,
        picker: false
      }

      this.socket = this.props.socket;
    }

    componentDidMount() {
      this.socket.on('lobby', lobby => {
        this.setState({lobby: lobby});
      })

      this.socket.on('leave request', () => {
        this.socket.emit('leave lobby');
        this.props.history.push('/');
      })

      this.socket.on('ronde', ronde => {
        this.setState({ronde: ronde});
      })

      this.socket.on('answers sent', ronde => {
        this.setState({ronde: ronde});
        this.changeScreens();
      })

      this.socket.on('wait for round', () => {
        this.setState({picker: true});
      })
    }

    changeScreens = () => {
      const newValue = this.state.screen + 1;

      this.setState({screen: newValue});
    }

    leaveLobby = () => {
      // check if socket is host
      // if host: remove lobby
      // if not host: leave lobby
      if(this.state.screen > 0){
        this.socket.emit('leave lobby');
        this.props.history.push('/');
      }
    }

    renderSwitch = (screen) => {
      switch (screen) {
        case 0:
          if(this.state.picker){
            return <PickerWait socket={this.socket} />
          }else{
            return <GameRonde socket={this.socket} handleChangeScreens={this.changeScreens} ronde={this.state.ronde} />
          }
          break;
        case 1: 
          return <StemRonde socket={this.socket} lobby={this.state.lobby} ronde={this.state.ronde} picker={this.state.picker} />
          break;
        default:
          break;
      }
    }
    
    render() {
      return (
        <div className="game">
          <h1>Game</h1>
          {/* Check if player is part of a lobby (request to server) and redirect to home if not + add notification */}
          {/* If player is part of game, load right screen etc. */}
          {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default Game;