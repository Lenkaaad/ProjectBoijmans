import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';

class GameWinner extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="winnaar">
          <header>
            <div></div>
            <h2>Winnaar</h2>
            <Link to="/">
              <img src={exit} alt="exit" height="30" />
            </Link>
          </header>
          <section>
            <h2 className="hide">Winnaar</h2>
            <article>
              <img src="#" alt="Avatar"/>
              <h3>Steffie</h3>
              <p>15 punten</p>
            </article>
          </section>
          <section>
            <h2>Honorable mentions</h2>
            <ul>
              <li>
                <article>
                  <h3>De snelle haas</h3>
                  <p>met een gemiddelde antwoord snelheid van 14 seconden</p>
                </article>
              </li>
              <li>
                <article>
                  <h3>De schildpad</h3>
                  <p>met een gemiddelde antwoord snelheid van 1 minuut</p>
                </article>
              </li>
              <li>
                <article>
                  <h3>Moeders favoriet</h3>
                  <p>met 12 likes of de antwoorden!</p>
                </article>
              </li>
            </ul>
          </section>
        </div>
      );
    }
  }
  
  export default GameWinner;