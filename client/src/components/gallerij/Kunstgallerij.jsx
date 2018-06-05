import React, { Component } from 'react';

class Kunstgallerij extends Component {

    constructor(props) {
      super(props);
    }
    
    render() {
      return (
        <div className="Gallerij">
        <h2>Kunstgallerij</h2>
          <div>
              <label htmlFor="kunststroming">Kunststroming</label>
              <select name="kunststroming" id="kunststroming">
                <option value="1">kunststroming 1</option>
                <option value="2">kunststroming 2</option>
                <option value="3">kunststroming 3</option>
                <option value="4">kunststroming 4</option>
              </select>
          </div>
          <div>
              <ul>
                  <li>kunstwerk 1</li>
                  <li>kunstwerk 2</li>
                  <li>kunstwerk 3</li>
                  <li>kunstwerk 4</li>
              </ul>
          </div>
        </div>
      );
    }
  }
  
  export default Kunstgallerij;