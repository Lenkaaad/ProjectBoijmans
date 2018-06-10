import React, { Component } from 'react';
import Carousel from './Carousel';
import FavouritesList from './FavouritesList';

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
            <div>
              <div>
                <label htmlFor="kunststroming">Kunststroming</label>
                <select onChange={this.handleChangeStyle} name="kunststroming" id="kunststroming">
                <option value="">Kies een kunststroming</option>
                  <option value="Oude Kunst">Oude Kunst</option>
                  <option value="Expressionisme">Expressionisme</option>
                  <option value="Beeldhouwkunst">Beeldhouwkunst</option>
                  <option value="Moderne Kunst">Moderne Kunst</option>
                  <option value="Postimpressionisme">Postimpressionisme</option>
                  <option value="Maniërisme">Maniërisme</option>
                </select>
              </div>
              <div>
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
        <div className="Gallerij">
          <h2>Kunstgallerij</h2>
          <nav>
            <ul>
              <li onClick={e => this.handleClickNav(e, 0)}>Algemeen</li>
              <li onClick={e => this.handleClickNav(e, 1)}>Favorieten</li>
            </ul>
          </nav>
          {this.renderSwitch(this.state.screen)}
        </div>
      );
    }
  }
  
  export default Kunstgallerij;