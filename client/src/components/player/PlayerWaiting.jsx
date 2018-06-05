import React, { Component } from 'react';

class PlayerWaiting extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Waiting">
          <h2>Wachten tot het spel start!</h2>
          <ul>
            <li>Milenka</li>
            <li>Larissa</li>
            <li>Milenka</li>
            <li>Milenka</li>
          </ul>
          <div>
            <p>Nog even de kunst afstoffen...</p>
          </div>
        </div>
      );
    }
  }
  
  export default PlayerWaiting;