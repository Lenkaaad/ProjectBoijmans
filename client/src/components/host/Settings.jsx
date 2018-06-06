import React, { Component } from 'react';

class Settings extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmit = e => {
      e.preventDefault();
      const gamename = e.currentTarget.gamename.value;
      const spelers = e.currentTarget.spelers.value;
      const rondes = e.currentTarget.rondes.value;
      const tijd = e.currentTarget.tijd.value;

      this.socket.emit('create lobby', {gamename, spelers, rondes, tijd})
      this.props.handleGameName(gamename);
      this.props.handleChangeScreens();

    }
    
    render() {
      return (
        <div className="Settings">
        <h2>Game lobby instellingen</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="gamename">Gamename </label>
            <input type="text" id="gamename" name="gamename"/>
          </div>
          <div>
            <label htmlFor="spelers">Aantal spelers </label>
            <input type="number" id="spelers" name="spelers"/>
          </div>
          <div>
            <label htmlFor="rondes">Aantal rondes</label>
            <input type="number" id="rondes" name="rondes"/>
          </div>
          <div>
            <label htmlFor="tijd">Tijd per ronde </label>
            <input type="number" id="tijd" name="tijd"/>
          </div>
          <input type="submit" value="verder naar mode"/>
        </form>
        </div>
      );
    }
  }
  
  export default Settings;