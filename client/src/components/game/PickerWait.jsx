import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import monalisa from '../../assets/img/monalisa.svg';
import play from '../../assets/img/playbtn.svg';
import dali from '../../assets/img/dali.jpg';

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
        <div className="judgewait">
          <header>
            <div></div>
            <h2>Ronde</h2>
            <Link to="/">
              <img src={exit} alt="exitbtn" height="30" />
            </Link>
          </header>
          <div className="pickerwait">
            <p>Jij stemt! De andere spelers zijn nu hun antwoorden aan het ingeven.</p>
          </div>
          
          <div>
            <img src={dali} alt="kunstwerk" className="kunstwerk" />
            <img src={play} alt="play" width="50" className="playbtn" />
          </div>

          <div className="feedback">
            <p>Wachten op de spelers ...</p>
          </div>
        </div>
      );
    }
  }
  
  export default PickerWait;