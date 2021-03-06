import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LikeButton from './LikeButton';

class Item extends Component {

  handleChangeLike() {
    //do nothing
  }
  
  render() {
      const className = 'item level' + this.props.level
      return(
        <div className={className}>
          {
            this.props.level === 0 ? <Link to={'/gallery/' + this.props.item.id}><div className="gallery-image" style={{backgroundImage: 'url(' + require('../../assets/img/artworks/gallerij/' + this.props.item.afbeeldingKunstwerk + '.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}><LikeButton artworkId={this.props.item.id} handleChangeLike={this.handleChangeLike}/>
            </div></Link> : <div className="gallery-image" style={{backgroundImage: 'url(' + require('../../assets/img/artworks/gallerij/' + this.props.item.afbeeldingKunstwerk + '.jpg') + ')', backgroundRepeat: 'no-repeat', backgroundSize: 'contain'}}>
          </div>
          }
          <div className="gallery-image-info">
            <div className="gallery-image-info__item">
              <h3>Kunstenaar</h3>
              <p>{this.props.item.kunstenaar}</p>
            </div>
            <div className="gallery-image-info__item gallery-image-info__left-item">
              <h3>Stijl</h3>
              <p>{this.props.item.stijl}</p>
            </div>
          </div>
        </div>
      )
  }
}

export default Item;