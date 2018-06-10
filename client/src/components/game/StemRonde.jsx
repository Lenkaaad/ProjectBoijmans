import React, { Component } from 'react';
import yellowArrow from '../../assets/img/yellowArrow.svg';
import cezanne from '../../assets/img/cezanne.jpg';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import arrow from '../../assets/img/arrow.svg';
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

    getRightImage = artwork => {
      switch(artwork){
        case 1: 
        return require('../../assets/img/art/1.jpg');
        break;
        case 2: 
        return require('../../assets/img/art/2.jpg');
        break;
        case 3: 
        return require('../../assets/img/art/3.jpg');
        break;
        case 4: 
        return require('../../assets/img/art/4.jpg');
        break;
        case 5: 
        return require('../../assets/img/art/5.jpg');
        break;
        case 6: 
        return require('../../assets/img/art/6.jpg');
        break;
        case 7: 
        return require('../../assets/img/art/7.jpg');
        break;
        case 8: 
        return require('../../assets/img/art/8.jpg');
        break;
        default: 
        break;
      }
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
            <div></div>
            <h2>Stemronde</h2>
              <img onClick={this.exitLobby} src={exit} alt="exit" height="30" />
          </header>
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <div className="waitcontainer">
            <img src={this.getRightImage(this.props.ronde.artwork)} alt="Kunstwerk" className="waitimg" />
            {
              this.props.picker && this.state.winner !== null ? <button onClick={this.handleNextRound} className="waitcontainer__volgende">Volgende ronde <img src={yellowArrow} alt="arrow" height="30" className="waitcontainer__next" /></button> : console.log("not picker")
            }
            </div>
          </section>
          <section className="bottom-item">
            <h2 className="hide">Antwoorden</h2>
            { this.state.winner === null ?
              <form onSubmit={this.handleStem}>
              {this.props.picker && this.props.ronde !== null ? <div className="judgecontainer"><p>Jij bent de baas. Kies je favoriet</p></div> : console.log("aan het kiezen") }
              
              {
                this.props.picker && this.props.ronde !== null ? this.props.ronde.antwoorden.map(ronde => <div><div className="antwoord_speler"><label htmlFor={ronde.player} className="containerRadio">{ronde.antwoord}<input type="radio" value={ronde.player} id={ronde.player} name="antwoord" /><span class="checkmarkRadio"></span></label></div></div>) : <div><ul>{this.props.ronde.antwoorden.map(ronde => <li className="antwoord_speler">{ronde.antwoord}</li>)}</ul><div className="feedback">Wachten op de beoordeling ...</div></div>
              }
              {
                this.props.picker && this.props.ronde !== null ? <div className="submitButton"><input type="submit" value="Stem nu" /><img src={arrow} alt="arrow" height="25" /></div> : console.log("not picker")
              }
            </form>
            : <ul>{this.props.ronde.antwoorden.map(ronde => <li className={`antwoord_speler ${ronde.antwoord === this.state.winner.antwoord ? 'round_winnerState' : console.log("not winner")}`}>{ronde.antwoord}</li>)}</ul>}
          </section>
        </div>
      );
    }
  }
  
  export default withRouter(StemRonde);