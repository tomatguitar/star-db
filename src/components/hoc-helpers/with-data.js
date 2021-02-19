import React, { Component } from 'react';

import Spinner from '../spinner/spinner';

const withData = (View, getData) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        itemList: null,
      };
    }
    componentDidMount() {
      const { getData } = this.props;

      getData().then((people) => {
        this.setState({
          itemList: people,
        });
      });
    }
    render() {
      const { data } = this.state;

      if (!data) {
        return <Spinner />;
      }
      return <View {...this.props} data={data} />;
    }
  };
};

export default withData;
