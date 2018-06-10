import React, { Component } from 'react';
import {withRouter} from "react-router-dom";
import exit from '../../assets/img/exit.svg';
import { Link } from 'react-router-dom';
import sezanne from '../../assets/img/cezanne.jpg';
import avatar_1 from '../../assets/img/avatar-1.svg';
import avatar_2 from '../../assets/img/avatar-2.svg';
import avatar_3 from '../../assets/img/avatar-3.svg';
import avatar_4 from '../../assets/img/avatar-4.svg';
import avatar_5 from '../../assets/img/avatar-5.svg';
import avatar_6 from '../../assets/img/avatar-6.svg';

class EndGame extends Component {

    constructor(props) {
      super(props);

      this.state = {
        
      }

      this.socket = this.props.socket;
      this.avatar = this.props.winner.avatar;
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
            <div></div>
            <h2>De winnaar</h2>
              <img onClick={this.exitLobby} src={exit} alt="exit" height="30" />
          </header>
          
          <img src={sezanne} alt="imageWaiting" className="waitcontainer__img" />

          <div className="winnerinfo">
          <div className="avatar">
            <div className={`avatar__image_small avatar__image__${this.avatar} randomAvatar`}></div>
          </div>

            <div className="winner">
              <p className="winner__name">{this.props.winner.nickname}</p>
              <p>{this.props.winner.wins} punten</p>
            </div>
          </div>

          <section className="mentions">
            <h2 className="mentions__title">Honorable mentions</h2>
            <ul>
              <li>
                <p className="mentions__blok mentions__one">Milenka</p>
                <article className="mentions__article">
                  <h3 className="mentions__subtitle">De snelle haas</h3>
                  <p className="mentions__content">met een gemiddelde antwoord snelheid van 14 seconden</p>
                </article>
              </li>
              <li>
                <p className="mentions__blok mentions__two">Larissa</p>
                <article className="mentions__article">
                  <h3 className="mentions__subtitle">De schildpad</h3>
                  <p className="mentions__content">met een gemiddelde antwoord snelheid van 1 minuut</p>
                </article>
              </li>
              <li>
                <p className="mentions__blok mentions__three">Elisa</p>
                <article className="mentions__article">
                  <h3 className="mentions__subtitle">Moeders favoriet</h3>
                  <p className="mentions__content">omdat je toch goed je best hebt gedaan.</p>
                </article>
              </li>
            </ul>
          </section>
        </div>
      );
    }
  }
  
  export default withRouter(EndGame);