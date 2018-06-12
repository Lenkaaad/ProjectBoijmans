import React, { Component } from 'react';
import exit from '../../assets/img/exit.svg';
import play from '../../assets/img/playbtn.svg';
import {withRouter} from "react-router-dom";

class GameRonde extends Component {

    constructor(props) {
      super(props);

      this.state = {
        enteringDone: false,
        seconds: 0
      }

      this.socket = this.props.socket;
    }

    componentDidMount() {
      this.timer = setInterval(
        () => this.countSeconds(),
        1000
        );
      }
    
    countSeconds() {
      const newSeconds = this.state.seconds + 1;
      this.setState({ seconds: newSeconds});
    }

    handleSubmitText = e => {
      e.preventDefault();
      clearInterval(this.timerId);

      const answer = e.currentTarget.answer.value;
      const seconds = this.state.seconds;

      this.socket.emit('enter answer', {answer, seconds});
      e.currentTarget.answer.disabled = true;
      this.setState({enteringDone: true})

      console.log(answer);
      //this.props.handleChangeScreens();
      
    }

    exitLobby = () => {
      this.socket.emit('leave lobby');
      this.props.history.push('/');
    }

    
    
    render() {

      console.log(this.props.ronde);
      
      return (
        <div className="ronde">
          <header>
            <div className="container">
              <div></div>
              <h2>Ronde</h2>
                <img onClick={this.exitLobby} src={exit} alt="exit" height="30" />
            </div>
          </header>

          <section className="container">
            <h2 className="hide">Jouw Antwoord</h2>
            <form onSubmit={this.handleSubmitText} className="formInterpretatie">
              <textarea required name="answer" placeholder="Schrijf hier jouw grappige interpretatie van dit schilderij. " className={this.state.enteringDone ? "formInterpretatie__invoerveld no-bg" : "formInterpretatie__invoerveld"}></textarea>
              {this.state.enteringDone ? console.log("no button") : <input disabled={this.state.enteringDone ? true : false } type="submit" name="check" value="&#x2713;" className="formInterpretatie__checkbtn" />}
            </form>
          </section>
          
          <div className={this.state.enteringDone ? "container artWork__container margin-added" : "container artWork__container"}>
            {this.props.ronde !== null ? <img src={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} alt="kunstwerk" className="kunstwerk" /> : console.log("not there yet")}
            <img src={play} alt="play" width="50" className="playbtn" />
          </div>

          <section>
            <p className="hide">{this.props.ronde !== null ? this.props.ronde.artwork : console.log("oopsie!")}</p>
          </section>
          
        </div>
      );
    }
  }
  
  export default withRouter(GameRonde);