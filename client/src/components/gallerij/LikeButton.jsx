import React, { Component } from 'react';

class LikeButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
        favourited: false
    }
  }

  componentDidMount() {
    if(window.localStorage && localStorage.getItem("artwork-favourites")){
      this.inFavourites = JSON.parse(localStorage.getItem("artwork-favourites")).find(id => {
        return id === this.props.artworkId
      })
    }

    if(this.inFavourites){
      this.setState({favourited: true});
    }else {
      this.setState({favourited: false});
    }
  }

  handleLike = e => {
    e.preventDefault();
    let favourites = [];
    
    if(window.localStorage && localStorage.getItem("artwork-favourites")){
      favourites = JSON.parse(localStorage.getItem("artwork-favourites"));
    }
    
    console.log(favourites);
    const inFavourites = favourites.find(id => {
      return id === this.props.artworkId
    })

    if(!inFavourites){
      favourites.push(this.props.artworkId);
      this.setState({favourited: true});
    }else{
      const index = favourites.indexOf(this.props.artworkId);
      if(index > -1) {
        favourites.splice(index, 1);
      }
      this.setState({favourited: false});
    }
    
    localStorage.setItem("artwork-favourites", JSON.stringify(favourites));
  }

  render () {
    console.log(this.state.favourited);
    return <p onClick={this.handleLike} className={this.state.favourited ? 'heart-filled' : 'heart-open'}></p>;
  }

};

export default LikeButton;