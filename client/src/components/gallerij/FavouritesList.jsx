import React, { Component } from 'react';
import LikeButton from './LikeButton';
import { Link } from 'react-router-dom';

class FavouritesList extends Component {

  constructor(props) {
    super(props)
    this.state = {
        favourites: []
    }
    this.this = this;
  }

  componentDidMount() {
    const newFavourites = JSON.parse(localStorage.getItem("artwork-favourites"));
    console.log(this);
    this.setState({favourites: newFavourites});
  }

  handleChangeLike = () => {
    const newFavourites = JSON.parse(localStorage.getItem("artwork-favourites"));
    this.this.setState({favourites: newFavourites});
  }

  render() {
    if(window.localStorage && this.state.favourites && this.state.favourites.length !== 0){
      return (
        <ul>
          {
            this.state.favourites.map((id, index) => {
            const artwork = this.props.artworks.find(artwork => {
              return artwork.id === id;
            });
            return (
              <Link to={'/gallery/' + id}><li key={artwork.id} className={ (index % 2) === 1 ? 'favourites-item' : 'favourites-item favourites-item__odd'}>
                <img width="76" height="113" className="favourites-item__image" src={require('../../assets/img/artworks/gallerij/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam}/>
                <div className="favourites-item__text">
                <h3>{artwork.naam}</h3>
                <p>{artwork.kunstenaar}</p>
                </div>
                <LikeButton artworkId={artwork.id} handleChangeLike={this.handleChangeLike}/>
              </li></Link>
            );
          })
          }
        </ul>
      )
    }
    return (
      <div className="gallery__container">
        <p>Je hebt nog geen favoriete kunstwerken.</p>
      </div>
    )
  }
  
};

export default FavouritesList;