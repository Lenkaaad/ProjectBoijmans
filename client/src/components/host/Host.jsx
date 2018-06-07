import React, { Component } from 'react';
import User from './User';
import Settings from './Settings';
import Waiting from './Waiting';
import {withRouter} from "react-router-dom";

class Host extends Component {

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
      })

      this.socket.on('go game', lobby => {
        this.props.history.push('/game');
      })
    }

    changeScreens = () => {
      const newValue = this.state.screen + 1;

      this.setState({screen: newValue});
    }

    leaveLobby = () => {
      if(this.state.screen > 1){
        this.socket.emit('remove lobby');
        this.props.history.push('/');
      }
    }

    renderSwitch = (screen) => {
      switch (screen) {
        case 0:
          return <User socket={this.socket} handleChangeScreens={this.changeScreens} />
          break;
        case 1: 
          return <Settings socket={this.socket} handleChangeScreens={this.changeScreens} />
          break;
        case 2: 
          return <Waiting socket={this.socket} lobby={this.state.lobby} />
          break;
        default:
          break;
      }
    }
    
    render() {

      return (
        <div className="Host">
        <button onClick={this.leaveLobby}>leave lobby</button>
        {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default withRouter(Host);