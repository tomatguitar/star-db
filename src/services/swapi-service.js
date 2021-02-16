class SwapiService {
  constructor() {
    this._apiBase = 'http://swapi.dev/api';
  }
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw Error(`Could not fetch ${url}, recieved status ${res.status}`);
    }

    return await res.json();
  }

  async getAllPeople() {
    const res = await this.getResource(`/people/`);
    return res.results.map(this._transformPerson);
  }

  async getPerson(id) {
    const person = await this.getResource(`/people/${id}/`);
    return this._transformPerson(person);
  }

  async getAllPlanets() {
    const res = await this.getResource(`/planets/`);
    return res.results.map(this._transformPlanet);
  }

  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}/`);
    return this._transformPlanet(planet);
  }

  async getAllStarships() {
    const res = await this.getResource(`/starships/`);
    return res.results.map(this._transformStarship);
  }

  async getStarship(id) {
    const starship = await this.getResource(`/starships/${id}/`);
    return this._transformStarhip(starship);
  }

  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

  _transformPlanet = (planet) => {
    return {
      id: this._extractId(planet),
      planetName: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter,
    };
  };

  _transformStarship = (starhip) => {
    return {
      id: this._extractId(starhip),
      starshipName: starhip.name,
      model: starhip.model,
      manufacturer: starhip.manufacturer,
      costInCredits: starhip.costInCredits,
      length: starhip.length,
      crew: starhip.crew,
      passengers: starhip.passengers,
      cargoCapicity: starhip.cargoCapicity,
    };
  };

  _transformPerson = (person) => {
    return {
      id: this._extractId(person),
      personName: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor,
    };
  };
}

export default SwapiService;
