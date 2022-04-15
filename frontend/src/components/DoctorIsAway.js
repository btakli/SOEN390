import { React } from "react";
import { Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import WelcomeBack from "../pages/home/WelcomeBack";

function DoctorIsAway(props) {
    if(props.auth.user.is_doctor && props.auth.userData.is_away){
        return <WelcomeBack />;
    } else {
        return <Outlet />;
    }
}

DoctorIsAway.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(DoctorIsAway);
