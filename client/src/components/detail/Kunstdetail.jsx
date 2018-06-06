import React, { Component } from 'react';

class Kunstdetail extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Kunstdetail">
          <p>Foto</p>
          <p>Titel</p>
          <p>Kunstenaar</p>
          <p>Kunststroming</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, deleniti error porro molestiae aspernatur aliquid atque perspiciatis asperiores voluptas velit beatae culpa cum nesciunt ducimus non rem placeat! Repudiandae, facilis!</p>
          <h3>Bekijk ook deze werken</h3>
          <div>
              <ul>
                  <li>Kunstwerk 1</li>
                  <li>Kunstwerk 2</li>
                  <li>Kunstwerk 3</li>
              </ul>
          </div>
          <button>Interpretatie van de muziekant</button>
        </div>
      );
    }
  }
  
  export default Kunstdetail;