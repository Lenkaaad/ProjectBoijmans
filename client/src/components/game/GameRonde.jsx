import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import play from '../../assets/img/playbtn.svg';
import dali from '../../assets/img/dali.jpg';

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
          <header>
            <div></div>
            <h2>Ronde</h2>
            <Link to="/">
              <img src={exit} alt="exit" height="30" />
            </Link>
          </header>

          <section>
            <h2 className="hide">Jouw Antwoord</h2>
            <form onSubmit={this.handleSubmitText} className="formInterpretatie">
              <input name="answer" type="text" placeholder="Je leuke hedendaagse en grappige interpretatie komt hier, toch?" className="formInterpretatie__invoerveld" />
              <input disabled={this.state.enteringDone ? true : false } type="submit" name="check" value="&#x2713;" className="formInterpretatie__checkbtn" />
            </form>
          </section>

          <div>
            <img src={dali} alt="kunstwerk" className="kunstwerk" />
            <img src={play} alt="play" width="50" className="playbtn" />
          </div>

          <section>
            <p className="hide">{this.props.ronde !== null ? this.props.ronde.artwork : console.log("oopsie!")}</p>
          </section>
          
        </div>
      );
    }
  }
  
  export default GameRonde;