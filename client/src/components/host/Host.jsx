import React, { Component } from 'react';
import User from './User';
import Settings from './Settings';
import Mode from './Mode';
import Waiting from './Waiting';

class Host extends Component {

    constructor(props) {
      super(props);

      this.state = {
        screen: 0,
        gamename: null,
        players: []
      }

      this.socket = this.props.socket;
      this.lobby = {}
      console.log(this.props.state);
    }

    changeScreens = () => {
      const newValue = this.state.screen + 1;

      this.setState({screen: newValue});
    }

    handleGameName = gamename => {
      this.setState({gamename: gamename});
    }

    renderSwitch = (screen, state) => {
      switch (screen) {
        case 0:
          return <User socket={this.socket} handleChangeScreens={this.changeScreens} />
          break;
        case 1: 
          return <Settings socket={this.socket} handleChangeScreens={this.changeScreens} handleGameName={this.handleGameName} />
          break;
        case 2: 
          return <Mode socket={this.socket} handleChangeScreens={this.changeScreens} />
          break;
        case 3:
          return <Waiting socket={this.socket} state={state} players={this.state.players} />
          break;
        default:
          break;
      }
    }
    
    render() {

      this.socket.on('lobbies', lobbies => {
        this.setState({lobbies: lobbies});
      })

      this.socket.on('new lobby', lobby => {
        this.setState({gamename: lobby})
      })

      this.socket.on('players', players => {
        this.setState({players});
      })
      

      console.log(this.state);

      return (
        <div className="Host">
        {this.renderSwitch(this.state.screen, this.props.state)}
        </div>
      );
    }
  }
  
  export default Host;