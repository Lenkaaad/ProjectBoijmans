import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import exit from '../../assets/img/exit.svg';
import avatar_3 from '../../assets/img/avatar-3.svg';
import play from '../../assets/img/playbtn.svg';
import dali from '../../assets/img/dali.jpg';
import {withRouter} from "react-router-dom";

class PickerWait extends Component {

    constructor(props) {
      super(props);

      this.state = {
        
      }

      this.socket = this.props.socket;
      this.imageURL = `../../assets/img/art/` + this.props.ronde.artwork + `.jpeg`;
    }

    exitLobby = () => {
      this.socket.emit('leave lobby');
      this.props.history.push('/');
    }
    
    render() {

      console.log(this.props.ronde);
      
      return (
        <div className="judgewait">
          <header>
            <div className="container">
              <div></div>
              <h2>Ronde</h2>
              <img onClick={this.exitLobby} src={exit} alt="exitbtn" height="30" />
            </div>
          </header>

          <div className="container">
            <div className="pickerwait">
              <p>Jij stemt! De andere spelers zijn nu hun antwoorden aan het ingeven.</p>
            </div>

            <div class="artWork__container bottom-item">
              <img src={require('../../assets/img/art/' + this.props.ronde.artwork + '.jpg')} alt="kunstwerk" className="kunstwerk" />
              <img src={play} alt="play" width="50" className="playbtn" />
            </div>
          </div>

          <div className="feedback">
            <p>Wachten op de spelers ...</p>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(PickerWait);