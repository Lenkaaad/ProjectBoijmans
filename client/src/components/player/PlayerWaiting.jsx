import React, { Component } from 'react';

class PlayerWaiting extends Component {

    // constructor(props) {
    //   super(props);
    // }
    
    render() {
      return (
        <div className="player-wait">
          <section>
            <h2>Wachten tot het spel start!</h2>
            <ul>
              <li>Milenka</li>
              <li>Larissa</li>
              <li>Milenka</li>
              <li>Milenka</li>
            </ul>
          </section>
          <section>
            <h2 className="hide">Loading Tekst</h2>
            <p>Nog even de kunst afstoffen...</p>
          </section>
        </div>
      );
    }
  }
  
  export default PlayerWaiting;