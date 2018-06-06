import React, { Component } from 'react';

class Mode extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmit = e => {
      e.preventDefault();
      const mode = e.currentTarget.mode.value;

      this.socket.emit('set mode', mode);
      this.props.handleChangeScreens();
    }

    render() {
      return (
        <div className="Mode">
          <header>
            <h2>Hoe loopt je spel?</h2>
          </header>

          <p className="formTitle">Modus</p>
          <p className="inputDescription">Welke modus verkies je?</p>

          <form onSubmit={this.handleSubmit}>
            <div className="modeGrid">
              <input type="radio" value="1" name="mode" id="phones"/>
              <label htmlFor="phones">Hierbij kunnen jullie met de smartphone het spel spelen.</label>

              <input type="radio" value="2" name="mode" id="tv"/>
              <label htmlFor="tv">Met deze modus kan je zowel via de televisie en smarthone het spel spelen.</label>

              <input type="radio" value="3" name="mode" id="speech"/>
              <label htmlFor="speech">Met deze modus kan je verbaal met elkaar communiceren.</label>
            </div>

            <div className="submitButton">
              <input type="submit" value="Maak je avatar" />
              <img src="././assets/img/arrow.svg" alt="arrow" />
            </div>
          </form>
        </div>
      );
    }
  }

  export default Mode;
