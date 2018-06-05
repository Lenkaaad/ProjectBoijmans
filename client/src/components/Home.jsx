import React, { Component } from 'react';

class Home extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Home">
          <h1>Home</h1>
          <button>Play</button>
          <button>Join</button>
          <button>Kunstgallerij</button>
        </div>
      );
    }
  }
  
  export default Home;