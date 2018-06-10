import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import arrow from '../assets/img/arrow.svg';

class Notfound extends Component {

    render() {
      return (
        <div className="notfound">
          <h2>Oeps!</h2>

          <p>Mona is totaal de weg kwijt</p>

          <img src="#" alt="monalisa" />

          <Link to="/" className="submitButton">
            <img src={arrow} alt="arrow" height="25" className="arrowRotate" />
            <p>Terug naar home</p>
          </Link>
        </div>
      );
    }
  }
  
  export default Notfound;