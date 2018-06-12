import React, { Component } from 'react';
import yellowArrow from '../../assets/img/yellowArrow.svg';
import exit from '../../assets/img/exit.svg';
import {withRouter} from "react-router-dom";

class StemRonde extends Component {

    constructor(props) {
      super(props);

      this.state = {
        winner: null
      }

      this.socket = this.props.socket;
    }

    componentDidMount() {  
      this.socket.on('winner', winner => {
        this.setState({winner: winner});
      })
    }

    handleStem = e => {
      e.preventDefault();
      const naam = e.currentTarget.antwoord.value;

      this.socket.emit('vote for answer', naam);
      // stuur stem door naar server => update players
    }

    handleNextRound = () => {
      this.socket.emit('next round');
    }

    exitLobby = () => {
      this.socket.emit('leave lobby');
      this.props.history.push('/');
    }
    
    render() {

      console.log(this.props.ronde);
      return (
        <div className="stemmen">
          <header>
            <div className="container">
              <div></div>
              <h2>Stemronde</h2>
              <img onClick={this.exitLobby} src={exit} alt="exit" height="30" />
            </div>
          </header>
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <div className="container waitcontainer">
            <img src={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} alt="Kunstwerk" className="waitimg" />
            {
              this.props.picker && this.state.winner !== null ? <button onClick={this.handleNextRound} className="waitcontainer__volgende">Volgende ronde <img src={yellowArrow} alt="arrow" height="30" className="waitcontainer__next" /></button> : console.log("not picker")
            }
            </div>
          </section>
          <section className="bottom-item">
            <h2 className="hide">Antwoorden</h2>
            { this.state.winner === null ?
              <form onSubmit={this.handleStem}>
              {this.props.picker && this.props.ronde !== null ? <div className="container judgecontainer"><p>Jij bent de baas. Kies je favoriet</p></div> : console.log("aan het kiezen") }
              
              {
                this.props.picker && this.props.ronde !== null ? this.props.ronde.antwoorden.map(ronde => <div className="container"><div className="antwoord_speler"><label htmlFor={ronde.player} className="containerRadio">{ronde.antwoord}<input type="radio" value={ronde.player} id={ronde.player} name="antwoord" /><span class="checkmarkRadio"></span></label></div></div>) : <div><ul className="container">{this.props.ronde.antwoorden.map(ronde => <li className="antwoord_speler">{ronde.antwoord}</li>)}</ul><div className="feedback">Wachten op de beoordeling ...</div></div>
              }
              {
                this.props.picker && this.props.ronde !== null ? <div className="submitButton"><div className="container submit__layout"><input type="submit" className="enter-button" value="Stem nu" /></div></div> : console.log("not picker")
              }
            </form>
            : <ul className="container">{this.props.ronde.antwoorden.map(ronde => <li className={`antwoord_speler ${ronde.antwoord === this.state.winner.antwoord ? 'round_winnerState' : console.log("not winner")}`}>{ronde.antwoord}</li>)}</ul>}
          </section>
        </div>
      );
    }
  }
  
  export default withRouter(StemRonde);