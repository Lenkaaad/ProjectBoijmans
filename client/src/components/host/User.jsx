import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="User">
        <h2>Wie ben jij?</h2>
        <form>
          <div>
            <label htmlFor="nickname">Nickname</label>
            <input type="text" name="nickname"/>
          </div>
          <div>
            <input type="radio" name="avatar" id="scream" value="1"/><label htmlFor="scream">scream</label><br/>
            <input type="radio" name="avatar" id="melkmeisje" value="2"/><label htmlFor="melkmeisje">melkmeisje</label><br/>
            <input type="radio" name="avatar" id="monalisa" value="3"/><label htmlFor="monalisa">mona lisa</label><br/>
            <input type="radio" name="avatar" id="magritte" value="4"/><label htmlFor="magritte">magritte</label><br/>
            <input type="radio" name="avatar" id="vangogh" value="5"/><label htmlFor="vangogh">mona lisa</label><br/>
            <input type="radio" name="avatar" id="warhol" value="3"/><label htmlFor="warhol">warhol</label><br/>
          </div>
          <button>configure lobby</button>
        </form>
        </div>
      );
    }
  }
  
  export default User;