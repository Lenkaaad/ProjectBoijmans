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
        <div className="game">
          <h1>Game</h1>
          {/* switch in plaatsen */}
          <GameRonde />
          <StemRonde />
          <GameWinner />
        </div>
      );
    }
  }
  
  export default Game;