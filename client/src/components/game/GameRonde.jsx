import React, { Component } from 'react';

class GameRonde extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="ronde">
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <img src="#" alt="Kunstwerk"/>
          </section>
          <section>
            <h2 className="hide">Over het kunstwerk</h2>
            <article className="art-info left">
              <h3>Kunstenaar</h3>
              <p>Salvador Dali</p>
            </article>
            <article className="art-info right">
              <h3>Stijl</h3>
              <p>Surrealisme</p>
            </article>
          </section>
          <section>
            <h2 className="hide">Spelers</h2>
            <dl>
              <dt>Milenka</dt>
              <dd></dd>
              <dt>Steffie</dt>
              <dd>...</dd>
              <dt>Larissa</dt>
              <dd></dd>
              <dt>Elisa</dt>
              <dd>...</dd>
            </dl>
          </section>
          <section>
            <h2 className="hide">Timer</h2>
            <p>5m 30s</p>
          </section>
          <section>
            <h2 className="hide">Jouw Antwoord</h2>
            <input name="answer" type="text" placeholder="Je leuke hedendaagse en grappige interpretatie komt hier, toch?"/>
            <button>Check</button>
          </section>
        </div>
      );
    }
  }
  
  export default GameRonde;