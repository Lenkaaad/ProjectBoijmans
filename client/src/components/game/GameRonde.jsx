import React, { Component } from 'react';
import exit from '../../assets/img/exit.svg';
import play from '../../assets/img/playbtn.svg';
import pause from '../../assets/img/pausebtn.svg';
import Sound from 'react-sound';
import {withRouter} from "react-router-dom";

class GameRonde extends Component {

    constructor(props) {
      super(props);

      this.state = {
        enteringDone: false,
        seconds: 0,
        play: false,
        playStatus: "STOPPED"
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

    handleClickPlayOrPause = (e, status) => {
      e.preventDefault();

      const isPlaying = this.state.play;

      this.setState({play: !isPlaying, playStatus: status});
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
      this.props.ronde !== null ? (
        this.artwork = this.props.artworks.find(artwork => {
          return artwork.id === parseInt(this.props.ronde.artwork, 10);
        })
      ) : console.log("not there yet");
      
      return (
        <div className="ronde">
          <header>
            <div className="container">
              <div className="blankdiv"></div>
              <h2>Ronde</h2>
              <img onClick={this.exitLobby} src={exit} alt="exit" width="30" />
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
            {this.props.ronde !== null ? (<picture className="kunstdetail__picture">
              <source media="(max-width: 450px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-450w.webp')} type="image/webp" />
              <source media="(max-width: 450px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-450w.jpg')} />
              <source media="(min-width: 451px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-675w.webp')} type="image/webp" />
              <source media="(min-width: 451px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-675w.jpg')} />
              <source media="(min-width: 675px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '.webp')} type="image/webp" />
              <source media="(min-width: 675px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} />

              <img className="kunstwerk" src={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} alt="kunstwerk" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-450w.jpg') + ' 450w, ' + require('../../assets/img/art/' + this.props.ronde.artwork + '-675w.jpg') + ' 675w, ' + require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg') + ' 900w'} sizes="(max-width: 900px) 100vw, 900px"/>
              </picture>) : console.log("not there yet")
            }
            {this.props.ronde !== null ? (
              <div className="playbtn">
                {
                  this.state.play ? <img src={pause} alt="pause" width="50" className="playbtn" onClick={e => this.handleClickPlayOrPause(e, "PAUSED")}/> : <img src={play} alt="play" width="50" className="playbtn" onClick={e => this.handleClickPlayOrPause(e, "PLAYING")}/>
                }
                <Sound url={require('../../assets/music/' + this.artwork.muzikaleInterpretatie)} playStatus={this.state.playStatus}/>
              </div>
            ) : console.log("not there yet")
            } 
          </div>
          
        </div>
      );
    }
  }
  
  export default withRouter(GameRonde);