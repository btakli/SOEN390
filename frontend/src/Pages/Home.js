import Persons from '../components/Persons';
import PersonForm from '../components/PersonForm';
import React, { Fragment } from 'react';

function Home() {

  return (
    <Fragment>
      <Persons/>
      <PersonForm/>
    </Fragment>
  );
}

export default Home;
