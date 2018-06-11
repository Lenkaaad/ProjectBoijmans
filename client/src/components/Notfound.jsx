import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/img/arrow.svg';
import monalisa from '../assets/img/monalisa.svg';

class Notfound extends Component {

    render() {
      return (
        <div className="noconnection notfound">
          <div className="container">
            <div className="noconnection__layout">
              <div>
                <h2>Oeps!</h2>
                <p className="content">Mona is totaal de weg kwijt ...</p>
              </div>
              <img src={monalisa} alt="scream" width="300" />
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
  
  export default Notfound;