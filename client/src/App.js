import React, { Component } from 'react';
import './App.css';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Player from './components/player/Player';
import Host from './components/host/Host';
import Kunstgallerij from './components/gallerij/Kunstgallerij';
import Kunstdetail from './components/detail/Kunstdetail';
import Muziekdetail from './components/detail/Muziekdetail';
import { Switch, Route, Link } from 'react-router-dom'
//import { Offline, Online, Detector } from "react-detect-offline";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      currentLobby: null
    }
  }
  
  render() {
    socket.emit('test', 'dit is een testbericht');
    
    socket.on('lobbies', lobbies => {
      this.setState({lobbies: lobbies});
    })

    socket.on('new lobby', lobby => {
      this.setState({currentLobby: lobby})
    })

    return (
      <div className="App">
      <Switch>
        <Route exact path='/' render={() => (
        <Home socket={socket}/>
        )}/>
        <Route path='/join' render={() => (
        <Player socket={socket} state={this.state}/>
        )}/>
        <Route path='/create' render={() => (
        <Host socket={socket} state={this.state}/>
        )}/>
      </Switch>
      </div>
    );
  }
}

export default App;
