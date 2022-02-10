import Persons from '../components/Persons';
import PersonForm from '../components/PersonForm';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../redux/actions/authActions'

// MUI
import Link from "@mui/material/Link";

function Home(props) {

  const handleClick = e =>{
    props.logout();
  }

  return (
    <Fragment>
      <Link
        onClick={handleClick}
        variant="body2">
        {"LOGOUT"}
      </Link>
      <Persons />
      <PersonForm />
    </Fragment>
  );
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.authReducer
});


export default connect(mapStateToProps, { logout })(Home);
