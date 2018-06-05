import React, { Component } from 'react';

class PlayerJoin extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Join">
        <h2>Join lobby</h2>
          <label>Je nickname
            <input name="nickname" type="text"/>
            <p className="feedback">Wees een echte kunstenaar</p>
          </label>

          <h3>Kies je avatar</h3>
          <p className="feedback">Wie spreekt jouw het meeste aan?</p>
          
          <div>
            <input type="radio" id="avatarChoice1"
            name="avatar" value="scream"/>
            <label htmlFor="avatarChoice1">Scream</label><br/>
            <input type="radio" id="avatarChoice2"
            name="avatar" value="pearl"/>
            <label htmlFor="avatarChoice2">Pearl</label><br/>
            <input type="radio" id="avatarChoice3"
            name="avatar" value="monalisa"/>
            <label htmlFor="avatarChoice3">MonaLisa</label><br/>
            <input type="radio" id="avatarChoice4"
            name="avatar" value="apple"/>
            <label htmlFor="avatarChoice4">Apple</label><br/>
            <input type="radio" id="avatarChoice5"
            name="avatar" value="vincent"/>
            <label htmlFor="avatarChoice5">Vincent</label><br/>
            <input type="radio" id="avatarChoice6"
            name="avatar" value="marilyn"/>
            <label htmlFor="avatarChoice6">Marilyn</label><br/>
          </div>

          <label>Spelcode
            <input type="text" name="spelcode"/>
          </label>

          <button>Enter the lobby</button>
        </div>
      );
    }
  }
  
  export default PlayerJoin;