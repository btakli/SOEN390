import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusTable from "../tables/StatusTable";
import { getPatientLatestStatus } from '../../redux/actions/statusActions';
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import emailjs from "@emailjs/browser";

const theme = createTheme();

function currentPatient(id, patients){
  return patients.find(({ user }) => id === user );
}

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

function StatusViewRequestForm(props) {
  const { open, onClose, patientId } = props;

  const defaultStatusRequest = {
    subject: "Patient Symptom Status Update",
    urgency: 8,
    email: "",
    message: "",
    sender_name: `${(props.auth.user.is_doctor)? "Dr.":"Officer"} ${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    sender_id: props.auth.userData.user,
    reply_to: props.auth.user.email
  };

  const [emailData, setEmailData] = useState(defaultStatusRequest);

  const [patient, setPatient] = useState({});

  useEffect(() => {
    if(patientId && patientId != 0){
      props.getPatientLatestStatus(patientId);
      setPatient(currentPatient(patientId, props.patients));
    }
  }, [patientId]);

  useEffect(() => {
    if (!isEmpty(patient)){
      setEmailData(prevEmailData => ({
        ...prevEmailData,
        ["email"]: patient.email,
        ["message"]: `Hi ${patient.first_name}, this is your ${(props.auth.user.is_doctor)? "Doctor":"Officer"}, please update your status!`
      }));
    }
  }, [patient]);

  const sendStatusUpdateEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_7fml1kh",
        "template_2rbv5nq",
        emailData,
        "LRUKM9mZ4TnU7IgU9"
      )
      .then((result) =>
        console.log("Email Sent Successfully", result.status, result.text)
      )
      .catch((error) => console.log("Email Send Failed...", error));

    props.createMessage({ emailSent: "Request Sent Successfully" });

    props.addNotification({
      type: "Email",
      user: patient.user,
      subject: "Status Request",
      message: `[${getFormattedDate(new Date())}] ${(props.auth.user.is_doctor)? "Dr. ":"Officer "}${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has sent you a request. Please check your email.`
    });
    
    onClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#101F33", color: "#fff" }}>
          Current Patient Status
          <IconButton
            edge="start"
            color="inherit"
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={sendStatusUpdateEmail}>
            <Container component="main" >
              <CssBaseline />
              <StatusTable />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {/* Must provide fields in form */}
                <Box sx={{ display: "none" }}>
                  <TextField
                    name="sender_name"
                    value={emailData.sender_name}
                  />
                  <TextField
                    name="sender_id"
                    value={emailData.sender_id}
                  />
                  <TextField
                    name="reply_to"
                    value={emailData.reply_to}
                  />
                  <TextField
                    name="subject"
                    value={emailData.subject}
                  />
                  <TextField
                    name="email"
                    value={emailData.email}
                  />
                  <TextField
                    name="message"
                    value={emailData.message}
                  />
                </Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Request Status Update
                </Button>
              </Box>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

StatusViewRequestForm.propTypes = {
  auth: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  patients: state.patientReducer.patients
});

export default connect(mapStateToProps, { getPatientLatestStatus, createMessage, addNotification })(StatusViewRequestForm);
