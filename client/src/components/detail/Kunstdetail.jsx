import React from 'react';
import { Link } from 'react-router-dom';

const Kunstdetail = ({artworks, id}) => {
  const artwork = artworks.find(artwork => {
    return artwork.id === parseInt(id);
  });

  return (
    <div className="Kunstdetail">
      <img src={require('../../assets/img/artworks/gallerij/' + artwork.afbeeldingKunstwerk + '.jpg')} alt={artwork.naam}/>
      <p>{artwork.naam}</p>
      <p>{artwork.kunstenaar}</p>
      <p>{artwork.stijl}</p>
      <p>{artwork.beschrijvingKunstwerk}</p>
      <h3>Bekijk ook deze werken</h3>
      <div>
          <ul>
              <li>Kunstwerk 1</li>
              <li>Kunstwerk 2</li>
              <li>Kunstwerk 3</li>
          </ul>
      </div>
      <Link to={'/gallery/' + id + '/music'}><button>Interpretatie van de muziekant</button></Link>
    </div>
  );
}
  
export default Kunstdetail;