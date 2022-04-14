import React, { Fragment, useState, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAvailabilities, deleteAvailability, addAvailability } from "../../redux/actions/availabilityActions";
import { createMessage } from "../../redux/actions/messageActions";

import CalendarTemplate from '../CalendarTemplate';


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
  availabilities: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  availabilities: state.availabilityReducer.availabilities
});

export default connect(mapStateToProps, { getAvailabilities, deleteAvailability, addAvailability, createMessage })(AvailabilityForm);