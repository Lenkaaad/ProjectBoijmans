import React, { Component } from 'react';
import yellowArrow from '../../assets/img/yellowArrow.svg';
import sezanne from '../../assets/img/cezanne.jpg';
import exit from '../../assets/img/exit.svg';
import {withRouter} from "react-router-dom";

class Waiting extends Component {

    constructor(props) {
      super(props);

      this.state = {
      }

      this.socket = this.props.socket;
    }

    handleStartGame = e => {
      this.socket.emit('start game')
    }

    exitLobby = () => {
      this.socket.emit('remove lobby');
      this.props.history.push('/');
    }

    render() {

      console.log(this.state);
      return (
        <div className="Waiting">
          <header>
            <div className="container">
              <div></div>
              <h2>Spelcode</h2>
                <img onClick={this.exitLobby} src={exit} alt="exitbtn" height="30" />
            </div>
          </header>

          <div className="container waitcontainer">
            <img src={sezanne} alt="imageWaiting" className="waitcontainer__img" />
            {
                this.props.lobby !== null ? (this.props.lobby.players.length > 2 ? <button onClick={this.handleStartGame} className="waitcontainer__volgende">
                Ronde 1
                <img src={yellowArrow} alt="arrow"  height="30" className="waitcontainer__next" />
              </button> : <p className="feedbackmelding">Je bent niet met genoeg aantal spelers. Je moet met minimum 3 spelers zijn om te kunnen spelen.</p> ) : console.log("no lobby")
            }
          </div>
          
          <div className="container">
            <div className="waitingcontent">
              <h3 className="waitingcontent__title">And now we wait...</h3>
              <p className="waitingcontent__description">Geef de code door aan je vrienden (of vijanden) zodat ze de lobby in kunnen!</p>
            </div>

            <ul className="waiting bottom-item">
              {
                this.props.lobby !== null ? this.props.lobby.players.map(player => <li className="avatar"><div className={`avatar__image_small avatar__image__${player.avatar}`}></div><span>{player.nickname}</span></li>) : console.log("oopsie!")
              }
            </ul>
          </div>

          {this.props.lobby !== null ?
            <div className="codecontainer">
              <p className="codecontainer__code">{this.props.lobby.gamename}</p>
            </div> : console.log("not found!") }
        </div>
      );
    }
  }

  export default withRouter(Waiting);
