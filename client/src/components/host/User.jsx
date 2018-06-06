import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
      super(props);

      this.socket = this.props.socket;
    }

    handleSubmit = e => {
      e.preventDefault();
      const avatar = e.currentTarget.avatar.value
      const nickname = e.currentTarget.nickname.value
      const host = true;

      this.socket.emit('create user', {nickname, avatar, host});
      this.props.handleChangeScreens();
    }

    render() {
      return (
        <div className="User">
          <header>
              <h2>Wie ben jij?</h2>
            </header>

            <form onSubmit={this.handleSubmit}>
              <div className="formInput">
                <label htmlFor="nickname" className="formTitle">Je nickname</label>
                <input type="text" placeholder="Vul een leuke nickname in" name="nickname" className="inputField" />
                <p className="inputDescription">Wees een echte kunstenaar</p>
              </div>

              <div>
                <label className="formTitle">Kies je avatar</label>
                <p className="inputDescription">Wie spreekt jou het meeste aan?</p>


                <div className="avatargrid">
                  <div>
                    <input type="radio" name="avatar" id="scream" value="1"/>
                    <label htmlFor="scream" className="card scream"></label>
                  </div>
                  <div>
                    <input type="radio" name="avatar" id="melkmeisje" value="2"/>
                    <label htmlFor="melkmeisje" className="card melkmeisje"></label>
                  </div>
                  <div>
                    <input type="radio" name="avatar" id="monalisa" value="3"/>
                    <label htmlFor="monalisa" className="card monalisa"></label>
                  </div>
                  <div>
                    <input type="radio" name="avatar" id="magritte" value="4"/>
                    <label htmlFor="magritte" className="card magritte"></label>
                  </div>
                  <div>
                    <input type="radio" name="avatar" id="vangogh" value="5"/>
                    <label htmlFor="vangogh" className="card vangogh"></label>
                  </div>
                  <div>
                    <input type="radio" name="avatar" id="warhol" value="3"/>
                    <label htmlFor="warhol" className="card warhol"></label>
                  </div>
                </div>
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

  export default User;
