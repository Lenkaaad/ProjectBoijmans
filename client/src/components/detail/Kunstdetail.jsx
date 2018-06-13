import React from 'react';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/img/backarrow.svg';
import arrow from '../../assets/img/arrow.svg';

const Kunstdetail = ({artworks, id}) => {
  const artwork = artworks.find(artwork => {
    return artwork.id === parseInt(id, 10);
  });

  return (
    <div className="kunstdetail">
      <header>
        <div className="container">
          <Link to="/gallery">
            <img src={backbtn} alt="arrow" width="30" />
          </Link>
          <h2>Detail</h2>
          <div className="blankdiv"></div>
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
      <a href={artwork.linkKunstwerk} target="_blank" className="detail-image-description artwork-boijmans-link">Lees meer over dit werk of de website van Boijmans.</a>
      <div className="detail-image-recommended">
        <h3>Bekijk ook deze werken</h3>
        <ul className="recommended-artworks">
            <li className="recommended-artworks__item"><img src={require('../../assets/img/artworks/detail/recommendations/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} width="120" height="120"/></li>
            <li className="recommended-artworks__item"><img src={require('../../assets/img/artworks/detail/recommendations/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} width="120" height="120"/></li>
            <li className="recommended-artworks__item"><img src={require('../../assets/img/artworks/detail/recommendations/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} width="120" height="120"/></li>
        </ul>
      </div>
      {
        artwork.muzikaleInterpretatie !== "" ? (
          <Link to={'/gallery/' + artwork.id + '/music'} className="submitButton">
            <div className="container submit__layout">
              <p>Interpretatie van de muziekant</p>
              <img src={arrow} alt="arrow" height="30" />
            </div>
          </Link>
        ) : ""
      }
    </div>
  );
}
  
export default Kunstdetail;