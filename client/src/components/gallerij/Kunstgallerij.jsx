import React, { Component } from 'react';
import Carousel from './Carousel';
import FavouritesList from './FavouritesList';
import backbtn from '../../assets/img/backarrow.svg';
import { Link } from 'react-router-dom';

class Kunstgallerij extends Component {

    constructor(props) {
      super(props);

      this.state = {
        artworks: this.props.artworks,
        filtered: this.props.artworks,
        screen: 0,
      }
    }

    handleClickNav = (e, screenNumber) => {
      e.preventDefault();
      if(this.state.screen !== screenNumber){
        this.setState({screen: screenNumber});
      }
    }

    handleChangeStyle = e => {
      e.preventDefault();
      console.log(e.currentTarget.value);
      const filteredArtworks = this.state.artworks.filter(artwork => {
        if(e.currentTarget.value === ""){
          return artwork;
        }
        return artwork.stijl === e.currentTarget.value;
      });
      this.setState({filtered: filteredArtworks});
    }

    renderSwitch = (screen) => {
      switch (screen) {
        case 0:
          return (
            <div className="gallery__container">
              <div className="styleSelector">
                <label className="formInput__title" htmlFor="kunststroming">Kunststroming</label>
                <select className="formInput__input" onChange={this.handleChangeStyle} name="kunststroming" id="kunststroming">
                <option value="">Kies een kunststroming</option>
                  <option value="Oude Kunst">Oude Kunst</option>
                  <option value="Expressionisme">Expressionisme</option>
                  <option value="Beeldhouwkunst">Beeldhouwkunst</option>
                  <option value="Moderne Kunst">Moderne Kunst</option>
                  <option value="Postimpressionisme">Postimpressionisme</option>
                  <option value="Maniërisme">Maniërisme</option>
                </select>
              </div>
              <div className="carousel__container">
                <Carousel items={this.state.filtered} active={0} />
              </div>
            </div>
          );
        case 1: 
          return <FavouritesList artworks={this.state.artworks}/>;
        default:
          break;
      }
    }
    
    render() {
      return (
        <div className="gallerij">
          <header>
            <div className="container">
              <Link to="/">
                <img src={backbtn} alt="arrow" height="25" />
              </Link>
              <h2>Kunstgallerij</h2>
              <div></div>
            </div>
          </header>
          <nav>
            <ul className="submenu">
              <li className={this.state.screen === 0 ? 'submenu__item active' : 'submenu__item'} onClick={e => this.handleClickNav(e, 0)}>Algemeen</li>
              <li className={this.state.screen === 1 ? 'submenu__item active' : 'submenu__item'} onClick={e => this.handleClickNav(e, 1)}>Favorieten</li>
            </ul>
          </nav>
          {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default Kunstgallerij;