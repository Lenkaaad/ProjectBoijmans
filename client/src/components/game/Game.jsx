import React, { Component } from 'react';
import GameRonde from './GameRonde';
import StemRonde from './StemRonde';
import GameWinner from './GameWinner';

class Game extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Player">
          <h1>Game Lobby</h1>
          {/* switch in plaatsen */}
          <GameRonde />
          {/* aantal rondes die ingevuld worden => aantal stemrondes? */}
          <StemRonde />
          <GameWinner />
        </div>
      );
    }
  }
  
  export default Game;