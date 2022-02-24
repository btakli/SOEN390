import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/authActions";
import StatusForm from "../components/StatusForm";

function PatientStatus(props) {
  
  return (    
    <StatusForm />
  );
}

PatientStatus.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(PatientStatus);
