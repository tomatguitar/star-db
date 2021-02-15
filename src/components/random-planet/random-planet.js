import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';

import './random-planet.css';

class RandomPlanet extends Component {
  constructor() {
    super();
    this.swapi = new SwapiService();
    this.updatePlanet();
    this.state = {
      planet: {},
    };
  }

  onPlanetLoaded = (planet) => {
    this.setState({ planet });
  };

  updatePlanet() {
    const id = Math.floor(Math.random() * 25 + 2);
    this.swapi
      .getPlanet(id)
      .then(this.onPlanetLoaded)
      .catch((err) => {
        console.log('Could not fetch, ', err);
      });
  }

  render() {
    const {
      planet: { id, planetName, population, rotationPeriod, diameter },
    } = this.state;

    return (
      <div className="random-planet">
        <img
          className="planet-image"
          src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
          alt={planetName}
        />
        <div>
          <h4>{planetName}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default RandomPlanet;
