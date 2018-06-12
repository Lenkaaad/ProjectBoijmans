import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import exit from '../../assets/img/exit.svg';
import sezanne from '../../assets/img/cezanne.jpg';

class EndGame extends Component {

    constructor(props) {
      super(props);

      this.state = {
        
      }

      this.socket = this.props.socket;
    }

    exitLobby = () => {
      this.socket.emit('leave lobby');
      this.props.history.push('/');
    }
    
    render() {

      console.log(this.props.ronde);
      
      return (
        <div className="endgame">
          <header>
            <div className="container">
              <div className="blankdiv"></div>
              <h2>De winnaar</h2>
              <img onClick={this.exitLobby} src={exit} alt="exit" width="30" />
            </div>
          </header>
          
          <div className="container">
            <img src={sezanne} alt="imageWaiting" className="waitcontainer__img" />
          
            <div className="winnerinfo">
              <div className="avatar">
                <div className={`avatar__image_small avatar__image__${this.props.winner.winner.avatar} randomAvatar`}></div>
              </div>

              <div className="winner">
                <p className="winner__name">{this.props.winner.winner.nickname}</p>
                <p className="winner__points">{this.props.winner.winner.wins} punten</p>
              </div>
            </div>
          </div>

          <section className="container mentions">
            <h2 className="mentions__title">Honorable mentions</h2>
            <ul>
              <li>
                <p className="mentions__blok mentions__one">{this.props.winner.fastestPlayer.nickname}</p>
                <article className="mentions__article">
                  <h3 className="mentions__subtitle">De snelle haas</h3>
                  <p className="mentions__content">met een gemiddelde antwoord snelheid van {parseInt(this.props.winner.fastestPlayer.responseTime, 10)} seconden.</p>
                </article>
              </li>
              <li>
                <p className="mentions__blok mentions__two">{this.props.winner.slowestPlayer.nickname}</p>
                <article className="mentions__article">
                  <h3 className="mentions__subtitle">De schildpad</h3>
                  <p className="mentions__content">met een gemiddelde antwoord snelheid van {parseInt(this.props.winner.slowestPlayer.responseTime, 10)} seconden.</p>
                </article>
              </li>
              { this.props.winner.mothersFavorite !== undefined ? <li>
                <p className="mentions__blok mentions__three">{this.props.winner.mothersFavorite.nickname}</p>
                <article className="mentions__article">
                  <h3 className="mentions__subtitle">Moeders favoriet</h3>
                  <p className="mentions__content">omdat je toch goed je best hebt gedaan.</p>
                </article>
              </li> : console.log("no favorite!") }
              
            </ul>
          </section>
        </div>
      );
    }
  }
  
  export default withRouter(EndGame);