import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";

import { getDoctor } from "../../redux/actions/patientActions";
import { getAllStatus, getLatestStatus } from "../../redux/actions/statusActions";
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

// MUI
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    alertEmergency: {
      main: "#e6553c",
      contrastText: "#fff",
    },
  },
});

const getFormattedDate = (date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const time = `${date.getHours()}:${date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()}`;

  return (`${month} ${day}, ${year} @ ${time}`);
};

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function RequestByInfected(props) {

  const emptyEmail = {
    subject: "Emergency Alert",
    urgency: 10,
    email: "",
    message: "Please contact me! I am infected.",
    doctor_name: `${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    doctor_id: props.auth.userData.user,
    reply_to: props.auth.user.email
  };

  const [emailData, setEmailData] = useState(emptyEmail);

  const [isNotInfected, setIsNotInfected] = useState(false);

  useEffect(() => {
    props.getAllStatus();
    props.getLatestStatus();
    props.getDoctor();
  }, []);

  useEffect(() => {
    if (!isEmpty(props.doctor)){
      setEmailData((prevEmailData) => ({
        ...prevEmailData,
        ["email"]: props.doctor.email,
      }));
    }
  }, [props.doctor]);

  useEffect(() => {
    if (!isEmpty(props.status.latestStatus) && props.status.latestStatus.status === "Infected"){
      setIsNotInfected(true); // when the patient is not infected then button is disabled
    } else {
      setIsNotInfected(false); // when the patient is infected then the button is disabled
    }
  }, [props.status.latestStatus]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_7fjr35n",
        "template_6z43fbi",
        emailData, //params
        "2kKwY7XTMZzK4SSte"
      )
      .then((result) =>
        console.log("Email Sent Successfully", result.status, result.text)
      ).catch((error) => console.log("Email Send Failed...", error));

    props.createMessage({ emailSent: "Alert Sent Successfully" });

    props.addNotification({
      type: "InfectedAlert",
      user: props.doctor.user,
      subject: "Message Sent",
      message: `[${getFormattedDate(new Date())}] ${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has sent you an alert. Please check your email.`
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {isNotInfected && (
        <Box sx={{ m: 2 }}>
          <Typography sx={{ m: 1 }} variant="h4">
            Alerting Your Doctor
          </Typography>
          <Typography
            sx={{ m: 1 }}
            variant="body2"
            color="text.primary"
            justifyContent="left"
          >
            If your current status is "Infected" and require emergency
            assistance, please alert your assigned doctor by clicking the
            following button.
          </Typography>
          <Button
            variant="contained"
            onClick={sendEmail}
            color="alertEmergency"
            sx={{
              m: 1,
            }}
          >
            Emergency Alert
          </Button>
        </Box>
      )}
    </ThemeProvider>
  );
}

RequestByInfected.propTypes = {
  auth: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  status: state.statusReducer,
  doctor: state.patientReducer.doctor,
});

export default connect(mapStateToProps, { getAllStatus, getLatestStatus, getDoctor, createMessage, addNotification })(RequestByInfected);