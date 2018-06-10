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

    getRightImage = artwork => {
      switch(artwork){
        case 1: 
        return require('../../assets/img/art/1.jpg');
        break;
        case 2: 
        return require('../../assets/img/art/2.jpg');
        break;
        case 3: 
        return require('../../assets/img/art/3.jpg');
        break;
        case 4: 
        return require('../../assets/img/art/4.jpg');
        break;
        case 5: 
        return require('../../assets/img/art/5.jpg');
        break;
        case 6: 
        return require('../../assets/img/art/6.jpg');
        break;
        case 7: 
        return require('../../assets/img/art/7.jpg');
        break;
        case 8: 
        return require('../../assets/img/art/8.jpg');
        break;
        default: 
        break;
      }
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
            <div></div>
            <h2>Ronde</h2>
              <img onClick={this.exitLobby} src={exit} alt="exitbtn" height="30" />
          </header>
          <div className="pickerwait">
            <p>Jij stemt! De andere spelers zijn nu hun antwoorden aan het ingeven.</p>
          </div>
          
          <div class="artWork__container bottom-item">
            <img src={this.getRightImage(this.props.ronde.artwork)} alt="kunstwerk" className="kunstwerk" />
            <img src={play} alt="play" width="50" className="playbtn" />
          </div>

          <div className="feedback">
            <p>Wachten op de spelers ...</p>
          </div>
        </div>
      );
    }
  }
  
  export default withRouter(PickerWait);