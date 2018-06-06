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
        lobby: null
      }

      this.socket = this.props.socket;
    }

    componentDidMount() {
      this.socket.on('lobby', lobby => {
        this.setState({lobby: lobby});
      })
    }

    changeScreens = () => {
      const newValue = this.state.screen + 1;

      this.setState({screen: newValue});
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
          return <Mode socket={this.socket} handleChangeScreens={this.changeScreens} />
          break;
        case 3:
          return <Waiting socket={this.socket} lobby={this.state.lobby} />
          break;
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
  
  export default Host;