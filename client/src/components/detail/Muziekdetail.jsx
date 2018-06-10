import React, { Component } from 'react';
import Sound from 'react-sound';

class Muziekdetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        play: false,
        playStatus: "STOPPED"
      }

      console.log(this.props.artworks);
      this.artwork = this.props.artworks.find(artwork => {
        return artwork.id === parseInt(this.props.id);
      });
    }

    handleClickPlayOrPause = (e, status) => {
      e.preventDefault();

      const isPlaying = this.state.play;

      this.setState({play: !isPlaying, playStatus: status});
    }
    
    render() {
      return (
        <div className="Muziekdetail">
          <p>Foto</p>
          <p>Naam artiest</p>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, deleniti error porro molestiae aspernatur aliquid atque perspiciatis asperiores voluptas velit beatae culpa cum nesciunt ducimus non rem placeat! Repudiandae, facilis!</p>
          
          <p>Luister naar de interpretatie</p>
          {
            this.state.play ? <button onClick={e => this.handleClickPlayOrPause(e, "PAUSED")}>Pause</button> : <button onClick={e => this.handleClickPlayOrPause(e, "PLAYING")}>Play</button>
          }
          <Sound url={require('../../assets/music/' + this.artwork.muzikaleInterpretatie)} playStatus={this.state.playStatus}/>
        </div>
      );
    }
  }
  
  export default Muziekdetail;