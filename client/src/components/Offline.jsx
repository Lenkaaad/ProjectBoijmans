import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Offline extends Component {

    render() {
      return (
        <div className="offline">
          <h2>Aaah!</h2>

          <p>#SteveZonderInternet</p>

          <img src="#" alt="scream" />

          <Link className="submitButton">
            <img src={arrow} alt="arrow" height="25" className="arrowRotate" />
            <p>Terug naar home</p>
          </Link>
        </div>
      );
    }
  }
  
  export default Offline;