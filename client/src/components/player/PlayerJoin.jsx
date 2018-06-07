import React, { Component } from 'react';

class PlayerJoin extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
      this.avatar = Math.floor(Math.random() * 7);
    }

    handleSubmitPlayer = e => {
      e.preventDefault();
      const nickname = e.currentTarget.nickname.value;
      const gamename = e.currentTarget.spelcode.value;
      const avatar = this.avatar;

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

            <label htmlFor="spelcode">Spelcode</label>
            <input type="text" name="spelcode" id="spelcode"/>

            <input type="submit" value="Enter the lobby"/>
          </form>
        </div>
      );
    }
  }
  
  export default PlayerJoin;