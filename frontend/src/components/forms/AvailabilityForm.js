import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailabilities, deleteAvailability, addAvailability } from "../../redux/actions/availabilityActions";
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

import CalendarTemplate from '../CalendarTemplate';

const getFormattedDate = (date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const time = `${date.getHours()}:${date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()}`;

  return (`${month} ${day}, ${year} @ ${time}`);
};

function AvailabilityForm(props) {
  const [availabilityState, setAvailabilityState] = useState([])

  useEffect(() => {
    props.getAvailabilities();
  }, []);

  useEffect(() => {
    if (props.availabilities.length > 0){
      setAvailabilityState(props.availabilities);
    }
  }, [props.availabilities]);

  function setAvailability(new_avails) {
    availabilityState.forEach((avail) => {
       props.deleteAvailability(avail["id"]);
    });
    new_avails.forEach((avail) => {
      props.addAvailability(avail);
    });
    props.getAvailabilities();
    props.createMessage({ saveAvails: "Availabilities Updated" });

    props.patients.forEach((patient) => {
      props.addNotification({
        type: "Appointment",
        user: patient["user"],
        subject: "Availabilites Updated",
        message: `[${getFormattedDate(new Date())}] Dr. ${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has updated their availabilities.`
      });
    });
    
  }

  const Calendar = CalendarTemplate({
    availability: availabilityState,
    setAvailability: setAvailability
  })
  return (
    <Fragment>
      <Calendar />
    </Fragment>
  );
}

AvailabilityForm.propTypes = {
  auth: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
  availabilities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.authReducer,
  patients: state.patientReducer.patients,
  availabilities: state.availabilityReducer.availabilities
});

export default connect(mapStateToProps, { getAvailabilities, deleteAvailability, addAvailability, createMessage, addNotification })(AvailabilityForm);