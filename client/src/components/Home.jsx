import React, { Component } from 'react';
import { Link } from 'react-router-dom'


class Home extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }
    
    render() {
      return (
        <div className="Home">
          <h1>Home</h1>
          <Link to="/create">Create lobby</Link>
          <Link to="/join">Play</Link>
        </div>
      );
    }
  }
  
  export default Home;