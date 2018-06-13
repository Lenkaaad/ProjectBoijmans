import React, { Component } from 'react';
import exit from '../../assets/img/exit.svg';
import play from '../../assets/img/playbtn.svg';
import pause from '../../assets/img/pausebtn.svg';
import {withRouter} from "react-router-dom";
import Sound from 'react-sound';

class PickerWait extends Component {

    constructor(props) {
      super(props);

      this.state = {
        play: false,
        playStatus: "STOPPED"
      }

      this.socket = this.props.socket;
      this.imageURL = `../../assets/img/art/` + this.props.ronde.artwork + `.jpeg`;
    }

    exitLobby = () => {
      this.socket.emit('leave lobby');
      this.props.history.push('/');
    }

    handleClickPlayOrPause = (e, status) => {
      e.preventDefault();

      const isPlaying = this.state.play;

      this.setState({play: !isPlaying, playStatus: status});
    }
    
    render() {

      this.props.ronde !== null ? (
        this.artwork = this.props.artworks.find(artwork => {
          return artwork.id === parseInt(this.props.ronde.artwork, 10);
        })
      ) : console.log("not there yet");
      
      return (
        <div className="judgewait">
          <header>
            <div className="container">
              <div className="blankdiv"></div>
              <h2>Ronde</h2>
              <img onClick={this.exitLobby} src={exit} alt="exitbtn" width="30" />
            </div>
          </header>

          <div className="container">
            <div className="pickerwait">
              <p>Jij stemt! De andere spelers zijn nu hun antwoorden aan het ingeven.</p>
            </div>

            <div className="artWork__container bottom-item">
              {this.props.ronde !== null ? (<picture className="kunstdetail__picture">
              <source media="(max-width: 450px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-450w.webp')} type="image/webp" />
              <source media="(max-width: 450px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-450w.jpg')} />
              <source media="(min-width: 451px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-675w.webp')} type="image/webp" />
              <source media="(min-width: 451px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-675w.jpg')} />
              <source media="(min-width: 675px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '.webp')} type="image/webp" />
              <source media="(min-width: 675px)" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} />

              <img className="kunstwerk" src={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} alt="kunstwerk" srcSet={require('../../assets/img/art/' + this.props.ronde.artwork + '-450w.jpg') + ' 450w, ' + require('../../assets/img/art/' + this.props.ronde.artwork + '-675w.jpg') + ' 675w, ' + require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg') + ' 900w'} sizes="(max-width: 900px) 100vw, 900px"/>
              </picture>) : console.log("not there yet")}
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

          <div className="feedback">
            <p>Wachten op de spelers ...</p>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(PickerWait);