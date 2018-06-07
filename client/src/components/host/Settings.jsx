import React, { Component } from 'react';

class Settings extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmit = e => {
      e.preventDefault();

      const rondes = e.currentTarget.rondes.value;

      this.socket.emit('create lobby', rondes)
      this.props.handleChangeScreens();

    }

    render() {
      return (
        <div className="Settings">
          <header>
              <h2>Hoe loopt je spel?</h2>
          </header>

          <form onSubmit={this.handleSubmit}>
            <div className="settingsGame">
              <label htmlFor="rondes" className="formTitle">Aantal rondes</label>
              <p className="inputDescription">Een korte game over de middag of een marathon?</p>
              <input type="number" id="rondes" name="rondes"/>
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
