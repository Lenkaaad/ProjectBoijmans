import React, { Component } from 'react';

class GameRonde extends Component {

    constructor(props) {
      super(props);

      this.state = {
        enteringDone: false
      }

      this.socket = this.props.socket;
    }

    handleSubmitText = e => {
      e.preventDefault();

      const answer = e.currentTarget.answer.value;

      this.socket.emit('enter answer', answer);
      e.currentTarget.answer.disabled = true;
      this.setState({enteringDone: true})

      console.log(answer);
      //this.props.handleChangeScreens();
    }
    
    render() {

      console.log(this.props.ronde);
      

      return (
        <div className="ronde">
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <img src="#" alt="Kunstwerk"/>
          </section>
          <section>
            <h2 className="hide">Over het kunstwerk</h2>

            <p>{this.props.ronde !== null ? this.props.ronde.artwork : console.log("oopsie!")}</p>
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
            <h2 className="hide">Timer</h2>
            <p>5m 30s</p>
          </section>
          <section>
            <h2 className="hide">Jouw Antwoord</h2>
            <form onSubmit={this.handleSubmitText}>
              <input name="answer" type="text" placeholder="Je leuke hedendaagse en grappige interpretatie komt hier, toch?"/>
              <input disabled={this.state.enteringDone ? true : false } type="submit" name="check" value="check"  />
            </form>
          </section>
        </div>
      );
    }
  }
  
  export default GameRonde;