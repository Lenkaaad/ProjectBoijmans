import React, { Component } from 'react';

class Noscript extends Component {

    render() {
      return (
        <div className="noscript">
          <h2>Help</h2>

          <p>Maak Vincent blij door <span>Javascript</span> aan te zetten.</p>
          <p>Zonder kan je helaas de app niet gebruiken</p>

          <img src="#" alt="vangogh" />

        </div>
      );
    }
  }
  
  export default Noscript;