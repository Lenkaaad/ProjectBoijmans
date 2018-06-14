import React from 'react';
import { Link } from 'react-router-dom';
import backbtn from '../../assets/img/backarrow.svg';
import arrow from '../../assets/img/arrow.svg';

const Kunstdetail = ({artworks, id}) => {
  const artwork = artworks.find(artwork => {
    return artwork.id === parseInt(id, 10);
  });

  console.log(artwork.recommendents);

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

      <picture className="kunstdetail__picture">
        <source media="(max-width: 450px)" srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '-450w.webp')} type="image/webp" />
        <source media="(max-width: 450px)" srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '-450w.jpg')} />
        <source media="(min-width: 451px)" srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '-675w.webp')} type="image/webp" />
        <source media="(min-width: 451px)" srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '-675w.jpg')} />
        <source media="(min-width: 675px)" srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '.webp')} type="image/webp" />
        <source media="(min-width: 675px)" srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '.jpg')} />

        <img className="kunstdetail__image" src={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam} srcSet={require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '-450w.jpg') + ' 450w, ' + require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '-675w.jpg') + ' 675w, ' + require('../../assets/img/artworks/detail/' + artwork.afbeeldingKunstwerk + '.jpg') + ' 900w'} sizes="(max-width: 900px) 100vw, 900px"/>
      </picture>
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
          {artwork.recommendents.map(recommendent => <li key={recommendent.photo} className="recommended-artworks__item"><picture><source media="(min-width: 1px)" srcSet={require('../../assets/img/artworks/detail/recommendations/' + recommendent.photo + '.webp')} type="image/webp" />
              <source media="(min-width: 1px)" srcSet={require('../../assets/img/artworks/detail/recommendations/' + recommendent.photo + '.jpg')} />
              <img width="120" height="120" src={require('../../assets/img/artworks/detail/recommendations/' + recommendent.photo + '.jpg')} alt="kunstwerk"/></picture></li> )}
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