import React, { Component } from 'react';

class Waiting extends Component {

    constructor(props) {
      super(props);

      this.state = {

      }
      
      this.socket = this.props.socket;
      this.gamename = this.props.state.currentLobby
      
    }
    
    render() {

      return (
        <div className="Waiting">
          <h2>Wachtlobby</h2>
          <h3>And now we wait...</h3>
          <p>Geef de code door aan je vrienden 
(of vijanden) zodat ze de lobby in kunnen!</p>
          <div>{this.props.state.currentLobby}</div>
          <div>
            <ul>
              {
                this.props.players.map(player => <li>{player.nickname}</li>)
              }
            </ul>
          </div>
          <button>start het spel</button>
        </div>
      );
    }
  }
  
  export default Waiting;