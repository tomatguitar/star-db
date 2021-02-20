import React from 'react';
import { withRouter } from 'react-router-dom';
import Row from '../row';
import { PersonList, PersonDetails } from '../sw-components';

const PeoplePage = ({ history, match }) => {
  return (
    <Row
      left={
        <PersonList
          onItemSelected={(id) => {
            history.push(id);
          }}
        />
      }
      right={<PersonDetails itemId={match.params.id} />}
    />
  );
};

export default withRouter(PeoplePage);
