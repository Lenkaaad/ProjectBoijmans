import React, { Component } from 'react';

class EndGame extends Component {

    constructor(props) {
      super(props);

      this.state = {
        
      }

      this.socket = this.props.socket;
    }
    
    render() {

      console.log(this.props.ronde);
      

      return (
        <div className="endgame">
        <p>End game!</p>
        <p>{this.props.winner.nickname} wins!</p>
        </div>
      );
    }
  }
  
  export default EndGame;