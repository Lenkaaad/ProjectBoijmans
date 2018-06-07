import React, { Component } from 'react';

class StemRonde extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {

      console.log(this.props.ronde);
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
              {
                this.props.ronde !== null ? this.props.ronde.antwoorden.map(ronde => <li>{ronde.antwoord}</li>) : console.log("oopsie!")
              }
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