import React from 'react';

const FavouritesList = ({artworks}) => {
  const favourites = JSON.parse(localStorage.getItem("artwork-favourites"));
  console.log(favourites);
  if(window.localStorage && favourites && favourites.length !== 0){
    console.log(favourites);
    return (
      <ul>
        {favourites.map(id => {
          const artwork = artworks.find(artwork => {
            return artwork.id === id;
          });
          return (
            <li>
              <p>{artwork.naam}</p>
            </li>
          );
        })}
      </ul>
    )
  }
  return (
    <p>Je hebt nog geen favoriete kunstwerken.</p>
  )
};

export default FavouritesList;