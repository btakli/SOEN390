import Persons from '../components/Persons';
import PersonForm from '../components/PersonForm';
import React, { Fragment } from 'react';
import Alerts from '../components/Alerts';

function Home() {

  return (
    <Fragment>
      <Alerts />
      <Persons />
      <PersonForm />
    </Fragment>
  );
}

export default Home;
