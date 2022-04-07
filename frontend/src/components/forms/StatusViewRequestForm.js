// Proof of concept for sending emails to
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import StatusTable from "../tables/StatusTable";
import { getLatestStatus } from '../../redux/actions/statusActions';

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

const StatusViewRequestForm = (props) => {
  const { open, onClose, patientId } = props;

  const [patient, setPatient] = useState({});

  useEffect(() => {
    if(patientId && patientId != 0){
      props.getLatestStatus(patientId);
      setPatient(currentPatient(patientId, props.patients));
    }
  }, [patientId]);

  useEffect(() => {
    setEmailData(defaultStatusRequest);
  }, [patient]);

  const defaultStatusRequest = {
    subject: "Patient Symptom Status Update",
    email: "delispeter19@gmail.com", // just for demo
    // email: patient.email,
    message: `Hi ${patient.first_name}, this is your doctor, please update your status!`,
    doctor_name: `Dr. ${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    doctor_id: props.auth.userData.user,
    reply_to: props.auth.user.email
  };

  const [emailData, setEmailData] = useState(defaultStatusRequest);

  const sendStatusUpdateEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_o5sf8uk",
        "template_v5kh4dw",
        e.target,
        "user_vnRqkOKsChMYAMYL7GxKC"
      )
      .then((result) =>
        console.log("Email Sent Successfully", result.status, result.text)
      )
      .catch((error) => console.log("Email Send Failed...", error));
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
                    name="patient_name"
                    value={emailData.doctor_name}
                  />
                  <TextField
                    name="patient_id"
                    value={emailData.doctor_id}
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

export default connect(mapStateToProps, { getLatestStatus })(StatusViewRequestForm);
