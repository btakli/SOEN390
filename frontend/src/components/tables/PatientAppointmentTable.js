import React, { useEffect, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getAppointments,
  deleteAppointment,
} from "../../redux/actions/appointmentActions";
import { getDoctor } from "../../redux/actions/patientActions";
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
} from "@mui/material";

function generateAppointmentList(appointments, doctor) {
  let aList = [];

  for (const a of appointments) {
    const start_date = new Date(a["start"].slice(0, -1));
    const end_date = new Date(a["end"].slice(0, -1));
    const day = start_date.getDate();
    const year = start_date.getFullYear();
    const month = start_date.toLocaleString("default", { month: "long" });
    const start_time = `${start_date.getHours()}:${
      start_date.getMinutes() <= 9
        ? "0" + start_date.getMinutes()
        : start_date.getMinutes()
    }`;
    const end_time = `${end_date.getHours()}:${
      end_date.getMinutes() <= 9
        ? "0" + end_date.getMinutes()
        : end_date.getMinutes()
    }`;

    const adata = {
      name: `Dr. ${doctor["first_name"]} ${doctor["last_name"]}`,
      date: `${month} ${day}, ${year}`,
      time: `${start_time} - ${end_time}`,
      id: a["id"],
    };

    aList.push(adata);
  }
  return aList;
}

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

const getFormattedDate = (date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const time = `${date.getHours()}:${
    date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()
  }`;

  return `${month} ${day}, ${year} @ ${time}`;
};

function PatientAppointmentTable(props) {
  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    props.getDoctor();
  }, []);

  useEffect(() => {
    props.getAppointments();
  }, []);

  useEffect(() => {
    if (!isEmpty(props.doctor)) {
      setAppointmentData(
        generateAppointmentList(props.appointments, props.doctor)
      );
    }
  }, [props.appointments, props.doctor]);

  const removeAppointment = (id) => {
    props.deleteAppointment(id);
    props.createMessage({ cancelAppointment: "Appointment Cancelled" });
    props.addNotification({
      type: "Appointment",
      user: props.doctor.user,
      subject: "Appointment Cancelled",
      message: `[${getFormattedDate(new Date())}] Your patient ${
        props.auth.userData["first_name"]
      } ${props.auth.userData["last_name"]} has cancelled an appointment.`,
    });
  };

  if (props.appointments.length == 0) {
    return (
      <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
        No Appointments!
      </Typography>
    );
  } else {
    return (
      <Fragment>
        <Typography variant="h3" component="div" align="center" sx={{ my: 3 }}>
          Appointments
        </Typography>
        <TableContainer
          component={Paper}
          sx={{ width: "80%", margin: "auto", my: 6 }}
        >
          <Table sx={{ minWidth: "sm" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointmentData.map((item, i) => (
                <TableRow
                  key={i + "0"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell key={i + "1"}>{item["name"]}</TableCell>
                  <TableCell key={i + "2"}>{item["date"]}</TableCell>
                  <TableCell key={i + "3"}>{item["time"]}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      color="error"
                      onClick={() => removeAppointment(item["id"])}
                    >
                      Cancel
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Fragment>
    );
  }
}

PatientAppointmentTable.propTypes = {
  auth: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  appointments: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  doctor: state.patientReducer.doctor,
  appointments: state.appointmentReducer.appointments,
});

export default connect(mapStateToProps, {
  getDoctor,
  getAppointments,
  deleteAppointment,
  createMessage,
  addNotification,
})(PatientAppointmentTable);
