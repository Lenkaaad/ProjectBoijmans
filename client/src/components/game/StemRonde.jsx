import React, { Component } from 'react';
import yellowArrow from '../../assets/img/yellowArrow.svg';
import cezanne from '../../assets/img/cezanne.jpg';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import arrow from '../../assets/img/arrow.svg';

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
    
    render() {

      console.log(this.props.ronde);
      return (
        <div className="stemmen">
          <header>
            <div></div>
            <h2>Stemronde</h2>
            <Link to="/">
              <img src={exit} alt="exit" height="30" />
            </Link>
          </header>
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <div className="waitcontainer">
            <img src={cezanne} alt="Kunstwerk" className="waitimg" />
            {
              this.props.picker && this.state.winner !== null ? <button onClick={this.handleNextRound} className="waitcontainer__volgende">Volgende ronde <img src={yellowArrow} alt="arrow" height="30" className="waitcontainer__next" /></button> : console.log("not picker")
            }
            </div>
          </section>
          <section>
            <h2 className="hide">Antwoorden</h2>
            { this.state.winner === null ?
              <form onSubmit={this.handleStem}>
              {
                this.props.picker && this.props.ronde !== null ? this.props.ronde.antwoorden.map(ronde => <div><div className="judgecontainer"><p>Jij bent de baas. Kies je favoriet</p></div><div className="antwoord_speler"><label htmlFor={ronde.player} className="containerRadio">{ronde.antwoord}<input type="radio" value={ronde.player} id={ronde.player} name="antwoord" /><span class="checkmarkRadio"></span></label></div></div>) : <div><ul>{this.props.ronde.antwoorden.map(ronde => <li className="antwoord_speler">{ronde.antwoord}</li>)}</ul><div className="feedback">Wachten op de beoordeling ...</div></div>
              }
              {
                this.props.picker && this.props.ronde !== null ? <div className="submitButton"><input type="submit" value="Stem nu" /><img src={arrow} alt="arrow" height="25" /></div> : console.log("not picker")
              }
            </form>
            : <ul>{this.props.ronde.antwoorden.map(ronde => <li>{ronde.antwoord === this.state.winner.antwoord ? ("winnaar: " + ronde.antwoord) : ronde.antwoord}</li>)}</ul>}
          </section>
        </div>
      );
    }
  }
  
  export default StemRonde;