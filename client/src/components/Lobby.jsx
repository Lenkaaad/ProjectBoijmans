import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import arrow from '../assets/img/arrow.svg';
import backbtn from '../assets/img/backarrow.svg';
import { Link } from 'react-router-dom';

class Lobby extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
      this.avatar = Math.ceil(Math.random() * 6);
    }

    handleSubmitPlayer = e => {
      e.preventDefault();
      const checked = e.currentTarget.lobbycode.checked;
      const nickname = e.currentTarget.nickname.value;
      const gamename = e.currentTarget.spelcode.value;
      const avatar = this.avatar;

      if(checked){
        this.socket.emit('user join', { nickname, avatar, gamename});
        this.props.history.push('/join');
      }else{
        const host = true;
        this.socket.emit('create user', {nickname, avatar, host});
        this.props.history.push('/create');
      }
    }

    showSpelcode = e => {
      console.log(e.currentTarget.checked);

      if(e.currentTarget.checked){
        document.querySelector('.add-spelcode').classList.remove('hide');
        document.querySelector('.enter-button').value = "Sluit aan bij het spel";
      }else{
        document.querySelector('.add-spelcode').classList.add('hide');
        document.querySelector('.enter-button').value = "Maak een spel aan";
      }
    }
    
    render() {
      return (
        <div className="lobby">
          <header>
            <div className="container">
              <Link to="/">
                <img src={backbtn} alt="arrow" height="25" />
              </Link>
              <h2>Wie ben je?</h2>
              <div></div>
            </div>
          </header>

          <div className="avatar">
              <div className={`avatar__image avatar__image__${this.avatar} randomAvatar`}></div>
          </div>

          <form onSubmit={this.handleSubmitPlayer}>
            <div className="container formInput">
              <label htmlFor="nickname" className="formInput__title">Je nickname</label>
              <input id="nickname" name="nickname" type="text" placeholder="Vul een leuke nickname in" className="formInput__input" />
              <p className="formInput__description">Wees een echte kunstenaar</p>
            </div>

            <div className="container">
              <div className="spelcodecontainer">
                <label htmlFor="lobbycode" className="spelcodecontainer__spelcode">Ik heb een spelcode!
                  <input type="checkbox" name="lobbycode" id="lobbycode" onChange={this.showSpelcode} value="1" className="hide" />
                  <span className="checkmark"></span>
                </label>
              </div>

              <hr />

            <div className="container add-spelcode hide bottom-item">
              {/* <label htmlFor="spelcode" className="formInput__title">Spelcode</label><br /> */}
              <input type="text" name="spelcode" id="spelcode" className="formInput__input" placeholder="Vul hier jou spelcode in" />
            </div>

            <div className="submitButton">
              <div className="container submit__layout">
                <input type="submit" className="enter-button" value="Maak een spel aan" />
                <img src={arrow} alt="arrow" height="25" />
              </div>
            </div>
          </div>
          </form>
        </div>
      );
    }
  }
  
  export default withRouter(Lobby);