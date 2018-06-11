import React from 'react';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/img/backarrow.svg';

const Kunstdetail = ({artworks, id}) => {
  const artwork = artworks.find(artwork => {
    return artwork.id === parseInt(id, 10);
  });

  return (
    <div className="kunstdetail">
      <header>
        <div className="container">
          <Link to="/">
            <img src={backbtn} alt="arrow" height="25" />
          </Link>
          <h2>Detail</h2>
          <div></div>
        </div>
      </header>
      <img className="kunstdetail__image" src={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam}/>
      <h3 className="detail-title">{artwork.naam}</h3>
      <div className="detail-image-info">
        <div>
          <h4>Kunstenaar</h4>
          <p>{artwork.kunstenaar}</p>
        </div>
        <div className="gallery-image-info__item gallery-image-info__left-item">
          <h4>Stijl</h4>
          <p>{artwork.stijl}</p>
        </div>
      </div>
      <p className="detail-image-description">{artwork.beschrijvingKunstwerk}</p>
      <div className="detail-image-recommended">
        <h3>Bekijk ook deze werken</h3>
        <ul className="recommended-artworks">
            <li className="recommended-artworks__item"><img src={require('../../assets/img/artworks/detail/recommendations/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} width="120" height="120"/></li>
            <li className="recommended-artworks__item"><img src={require('../../assets/img/artworks/detail/recommendations/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} width="120" height="120"/></li>
            <li className="recommended-artworks__item"><img src={require('../../assets/img/artworks/detail/recommendations/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} width="120" height="120"/></li>
        </ul>
      </div>
      <Link to={'/gallery/' + id + '/music'}><button className="submitButton">Interpretatie van de muziekant</button></Link>
    </div>
  );
}
  
export default Kunstdetail;