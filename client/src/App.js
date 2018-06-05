import React, { Component } from 'react';
import './App.css';
import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Player from './components/player/Player';
import Host from './components/host/Host';
import Kunstgallerij from './components/gallerij/Kunstgallerij';
import Kunstdetail from './components/detail/Kunstdetail';
import Muziekdetail from './components/detail/Muziekdetail';
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
        <Home />
      </div>
    );
  }
}

export default App;
