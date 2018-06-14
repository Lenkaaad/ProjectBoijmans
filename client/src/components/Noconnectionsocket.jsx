import React, { Component } from 'react';
import melkmeisje from '../assets/img/melkmeisje.svg';
import { Link } from 'react-router-dom';
import arrow from '../assets/img/arrow.svg';

class Noconnectionsocket extends Component {

    render() {
      return (
        <div className="noconnection socket">
          <div className="container">
            <div className="noconnection__layout">
              <div className="noconnection__content">
                <h2>Oeps!</h2>
                <p className="content">We ondervinden wat technische problemen, maar Pearl zou het leuk vinden als je later terug komt.</p>
              </div>
              <img src={melkmeisje} alt="Pearl" className="noconnection__img"/>
            </div>
          </div>
          <Link to="/" className="submitButton">
              <div className="container backhome">
                <img src={arrow} alt="arrow" height="30" className="arrowRotate" />
                <p>Terug naar home</p>
              </div>
            </Link>
        </div>
      );
    }
  }
  
  export default Noconnectionsocket;