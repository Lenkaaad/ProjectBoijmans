import React, { Component } from 'react';

class Muziekdetail extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Muziekdetail">
          <p>Foto</p>
          <p>Naam artiest</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, deleniti error porro molestiae aspernatur aliquid atque perspiciatis asperiores voluptas velit beatae culpa cum nesciunt ducimus non rem placeat! Repudiandae, facilis!</p>
          
          <p>Luister naar de interpretatie</p>
          <button>Interpretatie van de muziekant</button>
        </div>
      );
    }
  }
  
  export default Muziekdetail;