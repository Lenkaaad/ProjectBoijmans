import React, { Component } from 'react';
import Sound from 'react-sound';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/img/backarrow.svg';

class Muziekdetail extends Component {

    constructor(props) {
      super(props);
      this.state = {
        play: false,
        playStatus: "STOPPED"
      }

      console.log(this.props.artworks);
      this.artwork = this.props.artworks.find(artwork => {
        return artwork.id === parseInt(this.props.id, 10);
      });
    }

    handleClickPlayOrPause = (e, status) => {
      e.preventDefault();

      const isPlaying = this.state.play;

      this.setState({play: !isPlaying, playStatus: status});
    }
    
    render() {
      return (
        <div className="muziekdetail">
          <header>
            <div className="container">
              <Link to="/">
                <img src={backbtn} alt="arrow" height="25" />
              </Link>
              <h2>Detail</h2>
              <div></div>
            </div>
          </header>
          <img className="muziekdetail__image" src={require('../../assets/img/artworks/musicDetail/' + this.artwork.afbeeldingArtiest + '.jpg')} alt=""/>
          <div className="title-container">
            <h2 className="muziekdetail__title">{this.artwork.muziekDetailTitel}</h2>
          </div>
          <p className="muziekdetail__description">{this.artwork.motivatieArtiest}</p>
          
          <div className="music">
            <h2 className="muziekdetail__interpretation">Luister naar de interpretatie</h2>
            {
              this.state.play ? <button className="muziekdetail__button muziekdetail__pause" onClick={e => this.handleClickPlayOrPause(e, "PAUSED")}></button> : <button className="muziekdetail__button muziekdetail__play" onClick={e => this.handleClickPlayOrPause(e, "PLAYING")}></button>
            }
            <Sound url={require('../../assets/music/' + this.artwork.muzikaleInterpretatie)} playStatus={this.state.playStatus}/>
          </div>
        </div>
      );
    }
  }
  
  export default Muziekdetail;