import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import yellowArrow from '../../assets/img/yellowArrow.svg';
import backbtn from '../../assets/img/backarrow.svg';
import sezanne from '../../assets/img/cezanne.jpg';
import exit from '../../assets/img/exit.svg';
import monalisa from '../../assets/img/monalisa.svg';

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

    render() {

      console.log(this.state);
      return (
        <div className="Waiting">
          <header>
            <div></div>
            <h2>Spelcode</h2>
            <Link to="/">
              <img src={exit} alt="exitbtn" height="30" />
            </Link>
          </header>

          <div className="waitcontainer">
            <img src={sezanne} alt="imageWaiting" className="waitcontainer__img" />

            {
                this.props.lobby !== null ? (this.props.lobby.players.length > 2 ? <button onClick={this.handleStartGame} className="waitcontainer__volgende">
                Ronde 1
                <img src={yellowArrow} alt="arrow"  height="30" className="waitcontainer__next" />
              </button> : console.log("nog enough players")) : console.log("no lobby")
            }

            {/* <button onClick={this.handleStartGame} className="waitcontainer__volgende">
            Ronde 1
              <img src={yellowArrow} alt="arrow" height="30" className="waitcontainer__next" />
            </button> */}
          </div>

          <div class="waitingcontent">
            <h3 className="waitingcontent__title">And now we wait...</h3>
            <p className="waitingcontent__description">Geef de code door aan je vrienden (of vijanden) zodat ze de lobby in kunnen!</p>
          </div>

          <ul className="waiting">
              {
                this.props.lobby !== null ? this.props.lobby.players.map(player => <li><img src={monalisa} alt="avatar" />{player.nickname}</li>) : console.log("oopsie!")
              }
          </ul>

          {this.props.lobby !== null ?
            <div className="codecontainer">
              <p className="codecontainer__code">{this.props.lobby.gamename}</p>
            </div> : console.log("not found!") }
        </div>
      );
    }
  }

  export default Waiting;
