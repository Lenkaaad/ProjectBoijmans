import React, { Component } from 'react';
import './App.css';
import Onboarding from './components/Onboarding';
import Player from './components/player/Player';
//import { BrowserRouter, Route, Link } from 'react-router-dom'
//import { Offline, Online, Detector } from "react-detect-offline";

//import openSocket from 'socket.io-client';
//const socket = openSocket('http://localhost:8000');

class App extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="App">
        <Player />
      </div>
    );
  }
}

export default App;
