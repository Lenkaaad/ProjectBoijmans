import React, { Component } from 'react';

class Waiting extends Component {

    constructor(props) {
      super(props);

      this.state = {
      }
      
      this.socket = this.props.socket;
    }
    
    render() {

      console.log(this.state);
      return (
        <div className="Waiting">
          <h2>Wachtlobby</h2>
          <h3>And now we wait...</h3>
          <p>Geef de code door aan je vrienden 
(of vijanden) zodat ze de lobby in kunnen!</p>
          {this.props.lobby !== null ?
          <div>{this.props.lobby.gamename}</div> : console.log("not found!") }
          <div>
            <ul>
              {
                this.props.lobby !== null ? this.props.lobby.players.map(player => <li>{player.nickname}</li>) : console.log("oopsie!")
              }
            </ul>
          </div>
          <button>start het spel</button>
        </div>
      );
    }
  }
  
  export default Waiting;