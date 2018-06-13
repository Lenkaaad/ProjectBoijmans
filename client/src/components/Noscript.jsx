import React, { Component } from 'react';
import vangogh from '../assets/img/vangogh.svg';

class Noscript extends Component {

    render() {
      return (
        <div className="noconnection noscript">
          <div className="container">
            <div className="noconnection__layout">
              <div className="noconnection__content">
                <h2>Help</h2>
                
                <p className="content">Maak Vincent blij door Javascript aan te zetten.</p>
                <p className="content">Zonder kan je helaas de app niet gebruiken</p>

              </div>
              <img src={vangogh} alt="vangogh" />
            </div>
          </div>
        </div>
      );
    }
  }
  
  export default Noscript;