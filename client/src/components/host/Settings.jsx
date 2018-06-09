import React, { Component } from 'react';
import arrow from '../../assets/img/arrow.svg';
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

    render() {
      return (
        <div className="Settings">
          <header>
              <Link to="/">
                <img src={backbtn} alt="backbutton" height="30" />
              </Link>
              <h2>Hoe loopt je spel?</h2>
              <div></div>
          </header>

          <div className="rondes">
              <img src={rondeicon} alt="rondeImage" height="136" width="136" />
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="settingGame">
              <label htmlFor="rondes" className="formInput__title">Aantal rondes</label>
              <p className="formInput__description">Een korte game over de middag of een marathon?</p>
              
              <div className="rondes">
                <button className="rondes__less">-</button>
                <input type="number" id="rondes" name="rondes"/>
                <button className="rondes__more">+</button>
              </div>
            </div>

            <div className="submitButton">
              <input type="submit" value="Start het spel" />
              <img src={arrow} alt="arrow" height="25" />
            </div>
        </form>
        </div>
      );
    }
  }

  export default Settings;
