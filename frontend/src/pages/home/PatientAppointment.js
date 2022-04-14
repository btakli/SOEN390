import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppointmentForm from "../../components/forms/AppointmentForm";

import {
    Typography,
    Card,
    CardContent,
    Divider,
  } from "@mui/material";

function PatientAppointment(props){

  return (
    <Card align="center">
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
            
            <AppointmentForm />
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
