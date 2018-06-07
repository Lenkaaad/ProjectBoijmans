import React, { Component } from 'react';

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
          <section>
            <h2 className="hide">Kunstwerk</h2>
            <img src="#" alt="Kunstwerk"/>
          </section>
          
          <section>
            <h2 className="hide">Antwoorden</h2>
            { this.state.winner === null ?
              <form onSubmit={this.handleStem}>
              {
                this.props.picker && this.props.ronde !== null ? this.props.ronde.antwoorden.map(ronde => <div><input type="radio" value={ronde.player} id={ronde.player} name="antwoord" /><label htmlFor={ronde.player}>{ronde.antwoord}</label></div>) : <ul>{this.props.ronde.antwoorden.map(ronde => <li>{ronde.antwoord}</li>)}</ul>
              }
              {
                this.props.picker && this.props.ronde !== null ? <input type="submit" value="stem nu" /> : console.log("not picker")
              }
            </form>
            : <ul>{this.props.ronde.antwoorden.map(ronde => <li>{ronde.antwoord === this.state.winner.antwoord ? ("winner: " + ronde.antwoord) : ronde.antwoord}</li>)}</ul>}
          </section>
          {
            this.props.picker && this.state.winner !== null ? <button onClick={this.handleNextRound}>volgende ronde</button> : console.log("not picker")
          }
        </div>
      );
    }
  }
  
  export default StemRonde;