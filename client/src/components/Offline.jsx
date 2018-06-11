import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/img/arrow.svg';
import scream from '../assets/img/scream.svg';

class Offline extends Component {

    render() {
      return (
        <div className="noconnection offline">
          <div className="container">
            <div className="noconnection__layout">
              <div>
                <h2>Aaah!</h2>
                <p className="content">#SteveZonderInternet</p>
              </div>
              <img src={scream} alt="scream" width="300" />

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
  
  export default Offline;