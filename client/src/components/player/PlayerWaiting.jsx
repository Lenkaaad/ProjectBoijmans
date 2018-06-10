import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import avatar_3 from '../../assets/img/avatar-3.svg';
import {withRouter} from "react-router-dom";

class PlayerWaiting extends Component {

  constructor(props) {
    super(props);

    this.socket = this.props.socket;
  }

  exitLobby = () => {
    this.socket.emit('leave lobby');
    this.props.history.push('/');
  }
  
  render() {

    console.log(this.props);

    return (
      <div className="player-wait">
        <header>
          <div className="container">
            <div></div>
            <h2>Wachtruimte</h2>
              <img onClick={this.exitLobby} src={exit} alt="exit" height="30" />
          </div>
        </header>
        <ul className="waitgrid bottom-item">
            {
              this.props.lobby !== null ? this.props.lobby.players.map(player => <li><div className={`avatar__image_medium avatar__image__${player.avatar}`}></div><span>{player.nickname}</span></li>) : console.log("oopsie!")
            }
          </ul>
      

        <div className="feedback">
          <p>Wachten tot het spel start ...</p>
        </div>
      </div>
    );
  }
}
  
  export default withRouter(PlayerWaiting);