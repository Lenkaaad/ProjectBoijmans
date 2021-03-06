import React, { Component } from 'react';
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
          return <Settings socket={this.socket} handleChangeScreens={this.changeScreens} />
        case 1: 
          return <Waiting socket={this.socket} lobby={this.state.lobby} />
        default:
          break;
      }
    }
    
    render() {

      return (
        <div className="Host">
        {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default withRouter(Host);