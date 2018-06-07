import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
      this.avatar = Math.floor(Math.random() * 7);
    }

    handleSubmit = e => {
      e.preventDefault();
      const nickname = e.currentTarget.nickname.value
      const host = true;
      const avatar = this.avatar;

      this.socket.emit('create user', {nickname, avatar, host});
      this.props.handleChangeScreens();
    }

    render() {
      return (
        <div className="User">
          <header>
              <h2>Wie ben jij?</h2>
            </header>

            <form onSubmit={this.handleSubmit}>
              <div className="formInput">
                <label htmlFor="nickname" className="formTitle">Je nickname</label>
                <input type="text" placeholder="Vul een leuke nickname in" name="nickname" className="inputField" />
                <p className="inputDescription">Wees een echte kunstenaar</p>
              </div>

              <div className="submitButton">
                <input type="submit" value="Maak je avatar" />
                <img src="././assets/img/arrow.svg" alt="arrow" />
              </div>
            </form>
        </div>
      );
    }
  }

  export default User;
