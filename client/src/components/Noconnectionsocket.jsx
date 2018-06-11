import React, { Component } from 'react';
import melkmeisje from '../assets/img/melkmeisje.svg';

class Noconnectionsocket extends Component {

    render() {
      return (
        <div className="noconnection socket">
          <div className="container">
            <div className="noconnection__layout">
              <div>
                <h2>Oeps!</h2>
                
                <p className="content">We ondervinden wat technische problemen, maar Pearl zou het leuk vinden als je later terug komt.</p>

              </div>
              <img src={melkmeisje} alt="scream" width="300" />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Noconnectionsocket;