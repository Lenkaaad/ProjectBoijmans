import React, { Component } from 'react';
import arrow from '../../assets/img/arrow.svg';
import backbtn from '../../assets/img/backarrow.svg';

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
            <img src={backbtn} alt="arrow" height="25" />
            <h2>Wie ben je?</h2>
            <div></div>
          </header>

            <form onSubmit={this.handleSubmit}>
              <div className="formInput">
                <label htmlFor="nickname" className="formInput__title">Je nickname</label>
                <input type="text" placeholder="Vul een leuke nickname in" name="nickname" className="formInput__input" />
                <p className="formInput__description">Wees een echte kunstenaar</p>
              </div>

              <div className="submitButton">
                <input type="submit" value="Maak je avatar" />
                <img src={arrow} alt="arrow" height="25" />
              </div>
            </form>
        </div>
      );
    }
  }

  export default User;
