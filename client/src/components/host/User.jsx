import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmit = e => {
      e.preventDefault();
      const avatar = e.currentTarget.avatar.value
      const nickname = e.currentTarget.nickname.value 
      const host = true;

      this.socket.emit('create user', {nickname, avatar, host});
      this.props.handleChangeScreens();
    }
    
    render() {
      return (
        <div className="User">
        <h2>Wie ben jij?</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="nickname">Nickname</label>
            <input type="text" name="nickname"/>
          </div>
          <div>
            <input type="radio" name="avatar" id="scream" value="1"/><label htmlFor="scream">scream</label><br/>
            <input type="radio" name="avatar" id="melkmeisje" value="2"/><label htmlFor="melkmeisje">melkmeisje</label><br/>
            <input type="radio" name="avatar" id="monalisa" value="3"/><label htmlFor="monalisa">mona lisa</label><br/>
            <input type="radio" name="avatar" id="magritte" value="4"/><label htmlFor="magritte">magritte</label><br/>
            <input type="radio" name="avatar" id="vangogh" value="5"/><label htmlFor="vangogh">mona lisa</label><br/>
            <input type="radio" name="avatar" id="warhol" value="3"/><label htmlFor="warhol">warhol</label><br/>
          </div>
          <input type="submit" value="configure lobby" />
        </form>
        </div>
      );
    }
  }
  
  export default User;