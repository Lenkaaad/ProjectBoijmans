import React, { Component } from 'react';

class Waiting extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Waiting">
          <h2>Wachtlobby</h2>
          <h3>And now we wait...</h3>
          <p>Geef de code door aan je vrienden 
(of vijanden) zodat ze de lobby in kunnen!</p>
          <div>LOBBYCODE</div>
          <div>
            <ul>
              <li>Player 1</li>
              <li>Player 2</li>
              <li>Player 3</li>
              <li>Player 4</li>
            </ul>
          </div>
          <button>start het spel</button>
        </div>
      );
    }
  }
  
  export default Waiting;