import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/a_logo.svg';
import homeimage from '../assets/img/homeimage.jpg';
import logoboijmans from '../assets/img/boijmans-logo.svg';
import { Offline, Online, Detector } from "react-detect-offline";

class Home extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }
    
    render() {
      return (
        <div className="home">
          <header>
            <div className="container">
              <div className="home__content">
                <img src={logo} alt="logo" width="60" className="home__logo" />
                <h1> - Game</h1>
              </div>

              <img src={homeimage} alt="homeimage" width="300" className="home__image" />
            </div>
          </header>

          <article className="container home__buttons">
            <Link to="/">
              <button className="homebutton homebutton__gallerij">Kunst gallerij</button>
            </Link>
            <Link to="/lobby">
              <div className="playbutton">
                <p className="playbutton__play">Play!</p>
                <p className="playbutton__text">Speel met vrienden of andere spelers.</p>
              </div>
            </Link>
          </article>

          <div className="container">
            <div className="homebutton__boijmans">
              <Link to="/">
                <p className="boijmans__text">Bezoek de website van</p>
                <img src={logoboijmans} alt="logoboijmans" width="200" />
              </Link>
            </div>
          </div>

          <Online>
          <div className="feedback">Seems like you’re online and ready to go!</div>
          </Online>

          <Offline>
          <div className="feedback feedback_offline">Seems like you’re not online...</div>
          </Offline>
        </div>
      );
    }
  }
  
  export default Home;