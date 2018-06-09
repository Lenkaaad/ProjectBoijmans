import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import monalisa from '../../assets/img/monalisa.svg';

class PlayerWaiting extends Component {

  constructor(props) {
    super(props);

    this.socket = this.props.socket;
  }
  
  render() {

    console.log(this.props);

    return (
      <div className="player-wait">
        <header>
          <div></div>
          <h2>Wachtruimte</h2>
          <Link to="/">
            <img src={exit} alt="exit" height="30" />
          </Link>
        </header>
        <ul className="waitgrid">
            {
              this.props.lobby !== null ? this.props.lobby.players.map(player => <li><img src={monalisa} alt="avatar" />{player.nickname}</li>) : console.log("oopsie!")
            }
        </ul>
        <div className="feedback">
          <p>Wachten tot het spel start ...</p>
        </div>
      </div>
    );
  }
}
  
  export default PlayerWaiting;