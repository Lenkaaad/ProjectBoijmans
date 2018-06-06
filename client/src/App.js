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
    })

    socket.on('error', alert => {
      alert(alert);
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
        <Route path='/join' render={() => (
        <Player socket={socket} state={this.state}/>
        )}/>
        <Route path='/create' render={() => (
        <Host socket={socket} state={this.state}/>
        )}/>
      </Switch>
      <h2>Testing</h2>
      {/* Clarification: voor een of andere manier heeft hij bij de eerste fetch nog geen resultaat. Bij deze dus eerst checken om errors te voorkomen. */}
      <ul>
      {this.state.lobby !== null ? <li>{this.state.lobby.gamename}</li> : console.log("loading...")}
      </ul>
      {/* Put timer on this message so it disappears and reset state. */}
      {this.state.notification !== null ? <p>{this.state.notification}</p> : console.log("no error")}
      </div>
    );
  }
}

export default App;
