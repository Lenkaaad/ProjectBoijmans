import React, { Component } from 'react';

class PlayerJoin extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmitPlayer = e => {
      e.preventDefault();
      const nickname = e.currentTarget.nickname.value;
      const avatar = e.currentTarget.avatar.value;
      const gamename = e.currentTarget.spelcode.value;

      console.log(gamename);

      this.socket.emit('user join', { nickname, avatar, gamename});
      this.props.handleChangeScreens();
    }
    
    render() {
      return (
        <div className="player-join">
          <form onSubmit={this.handleSubmitPlayer}>
            <label htmlFor="nickname">Je nickname</label>
            <input id="nickname" name="nickname" type="text"/>
            <p className="feedback">Wees een echte kunstenaar</p>

            <fieldset>
              <legend>Kies je avatar</legend>
              <p className="feedback">Wie spreekt jouw het meeste aan?</p>
              
              <div>
                <input type="radio" id="avatarChoice1"
                name="avatar" value="scream"/>
                <label htmlFor="avatarChoice1">Scream</label>
                <input type="radio" id="avatarChoice2"
                name="avatar" value="pearl"/>
                <label htmlFor="avatarChoice2">Pearl</label>
                <input type="radio" id="avatarChoice3"
                name="avatar" value="monalisa"/>
                <label htmlFor="avatarChoice3">MonaLisa</label>
                <input type="radio" id="avatarChoice4"
                name="avatar" value="apple"/>
                <label htmlFor="avatarChoice4">Apple</label>
                <input type="radio" id="avatarChoice5"
                name="avatar" value="vincent"/>
                <label htmlFor="avatarChoice5">Vincent</label>
                <input type="radio" id="avatarChoice6"
                name="avatar" value="marilyn"/>
                <label htmlFor="avatarChoice6">Marilyn</label>
              </div>
            </fieldset>

            <label htmlFor="spelcode">Spelcode</label>
            <input type="text" name="spelcode" id="spelcode"/>

            <input type="submit" value="Enter the lobby"/>
          </form>
        </div>
      );
    }
  }
  
  export default PlayerJoin;