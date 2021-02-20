import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorBoundry from '../error-boundry';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  SecretPage,
  LoginPage,
} from '../pages';
import { StarshipDetails } from '../sw-components';

import './app.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      swapiService: new SwapiService(),
      isLoggedIn: false,
    };
  }

  onLogin = () => {
    this.setState({ isLoggedIn: true });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service =
        swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
      console.log('Switched to ', Service.name);
      return {
        swapiService: new Service(),
      };
    });
  };

  // toggleRandomPlanet = () => {
  //   this.setState((state) => {
  //     return {
  //       showRandomPlanet: !state.showRandomPlanet,
  //     };
  //   });
  // };

  render() {
    const { isLoggedIn } = this.state;
    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="stardb-app">
              <Header onServiceChange={this.onServiceChange} />
              <RandomPlanet />
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <h2>Welcome to starDB</h2>}
                />
                <Route path="/people/:id?" component={PeoplePage} />
                <Route path="/planets" component={PlanetsPage} />
                <Route exact path="/starships" component={StarshipsPage} />
                <Route
                  path="/starships/:id"
                  render={({ match }) => (
                    <StarshipDetails itemId={match.params.id} />
                  )}
                />
                <Route
                  path="/login/"
                  render={() => (
                    <LoginPage isLoggedIn={isLoggedIn} onLogin={this.onLogin} />
                  )}
                />
                <Route
                  path="/secret/"
                  render={() => <SecretPage isLoggedIn={isLoggedIn} />}
                />
                <Route render={() => <h2>Page not found</h2>} />
              </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
}
