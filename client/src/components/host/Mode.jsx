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
        <h2>Kies een game modus</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="radio" value="1" name="mode" id="phones"/><label htmlFor="phones">Phone mode</label><br/>
          <input type="radio" value="2" name="mode" id="tv"/><label htmlFor="tv">TV mode</label><br/>
          <input type="radio" value="3" name="mode" id="speech"/><label htmlFor="speech">Speech mode</label><br/>
          <input type="submit" value="start lobby"/>
        </form>
        </div>
      );
    }
  }
  
  export default Mode;