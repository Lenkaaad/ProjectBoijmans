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
      this.props.handleChangeScreens();

    }

    render() {
      return (
        <div className="Settings">
          <header>
              <h2>Hoe loopt je spel?</h2>
          </header>

          <form onSubmit={this.handleSubmit}>
            <div className="formInput">
              <label htmlFor="gamename" className="formTitle">Spelnaam</label>
              <input type="text" id="gamename" name="gamename" className="inputField" placeholder="Vul een leuke spelnaam in" />
            </div>
            <div className="settingsGame">
              <label htmlFor="spelers" className="formTitle">Aantal spelers </label>
              <p className="inputDescription">Het is zeker een populariteitswedstrijd</p>
              <input type="number" id="spelers" name="spelers"/>
            </div>
            <div className="settingsGame">
              <label htmlFor="rondes" className="formTitle">Aantal rondes</label>
              <p className="inputDescription">Een korte game over de middag of een marathon?</p>
              <input type="number" id="rondes" name="rondes"/>
            </div>
            <div className="settingsGame">
              <label htmlFor="tijd" className="formTitle">Tijd per ronde </label>
              <p className="inputDescription">Weed out the weak door niet te veel tijd toe te laten!</p>
              <input type="number" id="tijd" name="tijd"/>
            </div>

            <div className="submitButton">
              <input type="submit" value="Maak het spel aan" />
              <img src="././assets/img/arrow.svg" alt="arrow" />
            </div>
        </form>
        </div>
      );
    }
  }

  export default Settings;
