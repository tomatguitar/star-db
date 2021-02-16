import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner/spinner';

import './item-list.css';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.swapi = new SwapiService();
    this.state = {
      peopleList: null,
    };
  }

  componentDidMount() {
    this.swapi.getAllPeople().then((people) => {
      this.setState({
        peopleList: people,
      });
    });
  }

  renderItems = (arr) => {
    return arr.map(({ id, personName }) => {
      return (
        <li
          className="list-group-item"
          key={id}
          onClick={() => {
            this.props.onItemSelected(id);
          }}
        >
          {personName}
        </li>
      );
    });
  };

  render() {
    const { peopleList } = this.state;

    if (!peopleList) {
      return <Spinner />;
    }
    const items = this.renderItems(peopleList);
    return <ul className="item-list list-group">{items}</ul>;
  }
}
