import React, { Component } from 'react';

import './random-planet.css';

class RandomPlanet extends Component {
  render() {
    return (
      <div className="random-planet">
        <img
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/2.jpg`}
        />
        <div>
          <h4>Test</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>Test</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>Test</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>Test</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RandomPlanet;
