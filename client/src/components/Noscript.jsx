import React, { Component } from 'react';
import vangogh from '../assets/img/vangogh.svg';

class Noscript extends Component {

    render() {
      return (
        <div className="noconnection noscript">
          <div className="container">
            <div className="noconnection__layout">
              <div>
                <h2>Help</h2>
                
                <p className="content">Maak Vincent blij door Javascript aan te zetten.</p>
                <p className="content">Zonder kan je helaas de app niet gebruiken</p>

              </div>
              <img src={vangogh} alt="scream" width="300" />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Noscript;