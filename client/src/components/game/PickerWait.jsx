import React, { Component } from 'react';

class PickerWait extends Component {

    constructor(props) {
      super(props);

      this.state = {
        
      }

      this.socket = this.props.socket;
    }
    
    render() {

      console.log(this.props.ronde);
      

      return (
        <div className="pickerwait">
        <p>Jij stemt! De andere spelers zijn nu hun antwoorden aan het ingeven.</p>
        </div>
      );
    }
  }
  
  export default PickerWait;