import React, { Component } from 'react';
import './css/style.css';
// import Onboarding from './components/Onboarding';
import Home from './components/Home';
import Lobby from './components/Lobby';
import Player from './components/player/Player';
import Host from './components/host/Host';
import Game from './components/game/Game';
import Kunstgallerij from './components/gallerij/Kunstgallerij';
import Kunstdetail from './components/detail/Kunstdetail';
import Muziekdetail from './components/detail/Muziekdetail';
import Notfound from './components/Notfound';
import { Switch, Route, withRouter } from 'react-router-dom';
import arrow from './assets/img/arrow.svg';
import scream from './assets/img/scream.svg';
import WakeLock from 'react-wakelock';

import {artworks} from './assets/data/gallerij.json';

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

    socket.on('err', err => {
      this.props.history.push('/');
      this.setState({notification: err});
    })
  }

  handleRemoveNotification = () => {
    this.setState({notification: null});
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
        <Game socket={socket} state={this.state} artworks={artworks}/>
        )} />
        <Route path='/gallery/:id/music' render={({match}) => {
          const id = match.params.id;
          if(artworks[id - 1] && artworks[id - 1].muzikaleInterpretatie !== ""){
            return <Muziekdetail artworks={artworks} id={id} />
          }
          return <Route component={Notfound} />
        }} />
        <Route path='/gallery/:id' render={({match}) => {
          const id = match.params.id;
          if(artworks[id -1]){
            return <Kunstdetail artworks={artworks} id={id} />
          }
          return <Route component={Notfound} />
        }} />
        <Route path='/gallery' render={() => (
        <Kunstgallerij artworks={artworks}/>
        )} />
        <Route component={Notfound} />
      </Switch>
      {this.state.notification !== null ? 
      <div>
        <div class="pop-up__darkbg"></div>
          <div class="pop-up__err">
            <p>{this.state.notification}</p>
            <button onClick={this.handleRemoveNotification}>OK</button>
          </div>
      </div>
      : console.log("no notifications to show")}

      {/* create way to make sure these images have loaded in the first time */}
      <img src={scream} class="hide" alt="scream"/>
      <img src={arrow}  class="hide" alt="arrow"/>
      {/* Put timer on this message so it disappears and reset state. */}
      {/* <p className="err">{this.state.notification !== null ? <p>{this.state.notification}</p> : console.log("no error")}</p> */}
      <WakeLock />
      </div>
    );
  }
}

export default withRouter(App);
