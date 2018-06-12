import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/img/backarrow.svg';
import rondeicon from '../../assets/img/rondeicon.svg';

class Settings extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmit = e => {
      e.preventDefault();

      const rondes = e.currentTarget.rondes.value;

      this.socket.emit('create lobby', rondes)
      this.props.handleChangeScreens();

    }

    changeRounds = e => {
      e.preventDefault();
      console.log(e.currentTarget.dataset.what);

      const rounds = document.querySelector('#rondes');
      if(e.currentTarget.dataset.what === 'more'){
        rounds.value++
      }else{
        if(rounds.value > 1){
          rounds.value--;
        }
      }
    }

    render() {
      return (
        <div className="Settings">
          <header>
            <div className="container">
              <Link to="/">
                <img src={backbtn} alt="backbutton" width="30" />
              </Link>
              <h2>Hoe loopt je spel?</h2>
              <div className="blankdiv"></div>
            </div>
          </header>

          <div className="rondes">
            <img src={rondeicon} alt="rondeImage" height="136" width="136" />
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="container settingGame">
              <label htmlFor="rondes" className="formInput__title">Aantal rondes</label>
              <p className="formInput__description">Een korte game over de middag of een marathon?</p>
              
              <div className="rondes">
                <p data-what="less" className="rondes__less" onClick={this.changeRounds}>-</p>
                <input type="number" disabled id="rondes" name="rondes" min="1" value="5" class="roundsInput"/>
                <p data-what="more" className="rondes__more" onClick={this.changeRounds}>+</p>
              </div>
            </div>

            <div className="submitButton">
              <div className="container submit__layout">
                <input type="submit" value="Start het spel" className="enter-button" />
              </div>
            </div>
        </form>
        </div>
      );
    }
  }

  export default Settings;
