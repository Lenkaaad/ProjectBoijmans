import React, { Component } from 'react';

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
            <h2>Game lobby!</h2>
          </header>

          <img src="#" alt="imageWaiting" />

          <p>Spelcode</p>

          <h3 className="waittitle">And now we wait...</h3>
          <p className="waitdescription">Geef de code door aan je vrienden (of vijanden) zodat ze de lobby in kunnen!</p>
          {this.props.lobby !== null ?
          <div>{this.props.lobby.gamename}</div> : console.log("not found!") }
          <div>
            <ul>
              {
                this.props.lobby !== null ? this.props.lobby.players.map(player => <li>{player.nickname}</li>) : console.log("oopsie!")
              }
            </ul>
          </div>
              {
                this.props.lobby !== null ? (this.props.lobby.players.length > 2 ? <button onClick={this.handleStartGame} className="submitButton" >
                Start het spel!
                <img src="assets/img/arrow.svg" alt="arrow" />
              </button> : console.log("nog enough players")) : console.log("no lobby")
              }
        </div>
      );
    }
  }

  export default Waiting;
