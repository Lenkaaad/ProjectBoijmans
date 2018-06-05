import React, { Component } from 'react';
import User from './User';
import Settings from './Settings';
import Mode from './Mode';
import Waiting from './Waiting';

class Home extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Host">
          <User />
          <Settings />
          <Mode />
          <Waiting />
        </div>
      );
    }
  }
  
  export default Home;