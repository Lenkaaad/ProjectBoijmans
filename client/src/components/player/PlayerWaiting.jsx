import React, { Component } from 'react';

class PlayerWaiting extends Component {

  constructor(props) {
    super(props);

    this.socket = this.props.socket;
  }
  
  render() {

    console.log(this.props);

    return (
      <div className="player-wait">
        <section>
          <h2>Wachten tot het spel start!</h2>
          <ul>
            {
              this.props.lobby !== null ? this.props.lobby.players.map(player => <li>{player.nickname}</li>) : console.log("oopsie!")
            }
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