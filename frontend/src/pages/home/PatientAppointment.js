import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AvailabilityForm from "../../components/forms/AvailabilityForm";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
  } from "@mui/material";

function PatientAppointment(props){

  return (
    <Card>
        <CardContent>
            <Typography
            variant="h5"
            align="left"
            gutterBottom
            component="div"
            >
                {props.auth.userData.first_name}'s Appointments
            </Typography>

            <Divider />
            
            <AvailabilityForm />
        </CardContent>
    </Card>
  )
}

PatientAppointment.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(PatientAppointment);
