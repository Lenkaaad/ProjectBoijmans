import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";


class Lobby extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
      this.avatar = Math.floor(Math.random() * 7);
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
        document.querySelector('.enter-button').value = "Sluit je aan tot het spel";
      }else{
        document.querySelector('.add-spelcode').classList.add('hide');
        document.querySelector('.enter-button').value = "Maak een spel aan";
      }
    }
    
    render() {
      return (
        <div className="Lobby">
        <h2>Join een lobby of maak een lobby</h2>
        <form onSubmit={this.handleSubmitPlayer}>
            <label htmlFor="nickname">Je nickname</label>
            <input id="nickname" name="nickname" type="text"/>
            <p className="feedback">Wees een echte kunstenaar</p>

            <input type="checkbox" name="lobbycode" id="lobbycode" onChange={this.showSpelcode} value="1"/><label htmlFor="lobbycode">Ja, ik heb een spelcode!</label>
            <div className="add-spelcode hide">
            <label htmlFor="spelcode">Spelcode</label>
            <input type="text" name="spelcode" id="spelcode"/>

            
            </div>
            <div><input type="submit" className="enter-button" value="Maak een spel aan"/></div>
          </form>
        </div>
      );
    }
  }
  
  export default withRouter(Lobby);