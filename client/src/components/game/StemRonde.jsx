import React, { Component } from 'react';

class StemRonde extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="stemmen">
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <img src="#" alt="Kunstwerk"/>
            <button>Meer Info</button>
          </section>

          <section>
            <h2 className="hide">Antwoorden</h2>
            <ul>
              <li>Antwoord 1</li>
              <li>Antwoord 2</li>
              <li>Antwoord 3</li>
              <li>Antwoord 4</li>
            </ul>
          </section>

          <section>
            <h2 className="hide">Confirm</h2>
            <button>Klaar met stemmen</button>
          </section>
        </div>
      );
    }
  }
  
  export default StemRonde;