import React, { Component } from 'react';
import './css/style.css';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Lobby from './components/Lobby';
import Player from './components/player/Player';
import Host from './components/host/Host';
import Game from './components/game/Game';
import Kunstgallerij from './components/gallerij/Kunstgallerij';
import Kunstdetail from './components/detail/Kunstdetail';
import Muziekdetail from './components/detail/Muziekdetail';
import { Switch, Route, Link, withRouter } from 'react-router-dom'
//import { Offline, Online, Detector } from "react-detect-offline";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      currentLobby: null,
      lobby: null,
      notification: null
    }
  }

  componentDidMount() {
    socket.emit('test', 'dit is een testbericht');
    
    socket.on('lobby', lobby => {
      this.setState({lobby: lobby});
      console.log("lobby has been added")
    })

    socket.on('lobby removed', message => {
      this.setState({notification: message});
      setTimeout(() => {
        this.setState({notification: ""});
      }, 2000);
    })

    socket.on('err', err => {
      this.props.history.push('/');
      this.setState({notification: err});
    })

  }
  
  render() {

    socket.on('lobby', lobby => {
      this.setState({lobby: lobby});
      console.log("lobby has been added")
    })

    return (
      <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
        <Home socket={socket}/>
        )}/>
        <Route path='/lobby' render={() => (
        <Lobby socket={socket} state={this.state}/>
        )}/>
        <Route path='/join' render={() => (
        <Player socket={socket} state={this.state}/>
        )}/>
        <Route path='/create' render={() => (
        <Host socket={socket} state={this.state}/>
        )}/>
        <Route path='/game' render={() => (
        <Game socket={socket} state={this.state} />
        )} />
      </Switch>
      {/* Put timer on this message so it disappears and reset state. */}
      {this.state.notification !== null ? <p>{this.state.notification}</p> : console.log("no error")}
      </div>
    );
  }
}

export default withRouter(App);
