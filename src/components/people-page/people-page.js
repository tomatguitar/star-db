import React, { Component } from 'react';
import ItemList from '../item-list/item-list';
import PersonDetails from '../person-details/person-details';
import ErrorIndicator from '../error-indicator/error-indicator';
import ErrorBoundry from '../error-boundry/error-boundry';
import Row from '../row/row';

import './people-page.css';

export default class PeoplePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedPerson: 3,
    };
  }

  onPersonSelected = (selectedPerson) => {
    this.setState({
      selectedPerson,
    });
  };

  render() {
    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onPersonSelected}
        getData={this.props.getData}
        renderItem={({ name, birthYear }) => `${name} (${birthYear})`}
      />
    );

    const personDetails = (
      <PersonDetails personId={this.state.selectedPerson} />
    );

    return (
      <ErrorBoundry>
        <Row left={itemList} right={personDetails} />;
      </ErrorBoundry>
    );
  }
}
