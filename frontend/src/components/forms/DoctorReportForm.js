import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { createMessage } from "../../redux/actions/messageActions";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import ReportIcon from "@mui/icons-material/Report";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import emailjs from "@emailjs/browser";

const theme = createTheme();

function DoctorReportForm(props) {
  const { open, onClose } = props;

  const emptyEmail = {
    admin_email: "delispeter19@gmail.com",
    patient: "",
    message: "",
    reason: "",
    doctor_name: `Dr. ${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    doctor_id: props.auth.userData.user,
    doctor_email: props.auth.user.email,
  };

  const [emailData, setEmailData] = useState(emptyEmail);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_yn5erhm",
        "template_wzxbpkm",
        e.target,
        "OcJwqmp4t2RtcSozF"
      )
      .then((result) =>
        console.log("Email Sent Successfully", result.status, result.text)
      )
      .catch((error) => console.log("Email Send Failed...", error));

    setEmailData(emptyEmail);

    props.createMessage({ emailSent: "Message Sent Successfully" });

    onClose();
  };

  const onChange = (e) => {
    setEmailData((prevEmailData) => ({
      ...prevEmailData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#101F33", color: "#fff" }}>
          File a Report Against a Patient
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
          <Box component="form" onSubmit={sendEmail}>
            <Container component="main" maxWidth="sm">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ mt: 0, mb: 3, bgcolor: "secondary.main" }}>
                  <ReportIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Report Form
                </Typography>
                {(props.patients.length == 0) ?
                  <Fragment>
                    <Typography variant="h3">
                      No Patients!
                    </Typography>
                    <Typography variant="h4">
                      Please wait to be assigned patients.
                    </Typography>
                  </Fragment>
                  :
                  <Fragment>
                    <Box sx={{ display: "none" }}>
                      <TextField name="doctor_name" value={emailData.doctor_name} />
                      <TextField name="doctor_id" value={emailData.doctor_id} />
                      <TextField
                        name="doctor_email"
                        value={emailData.doctor_email}
                      />
                      <TextField name="reply_to" value={emailData.reply_to} />
                      <TextField name="admin_email" value={emailData.admin_email} />
                    </Box>
                    <InputLabel id="patient-label">
                      Patient Involved in Incident
                    </InputLabel>
                    <Select
                      required
                      labelId="patient-label"
                      name="patient"
                      label="Patient"
                      fullWidth
                      value={emailData.patient}
                      onChange={onChange}
                      sx={{ mt: 0, mb: 3 }}
                    >
                      {props.patients.map((patient, i) => (
                        <MenuItem key={i} value={patient.email}>
                          {`${patient.first_name} ${patient.last_name}`}
                        </MenuItem>
                      ))}
                    </Select>
                    <InputLabel id="reason-label">Reason for Report</InputLabel>
                    <Select
                      required
                      labelId="reason-label"
                      name="reason"
                      label="Reason"
                      fullWidth
                      value={emailData.reason}
                      onChange={onChange}
                      sx={{ mt: 0, mb: 3 }}
                    >
                      <MenuItem value={"Misconduct"}>Misconduct</MenuItem>
                      <MenuItem value={"Harassment"}>Harassment</MenuItem>
                      <MenuItem value={"Professionalism"}>Professionalism</MenuItem>
                      <MenuItem value={"Drug Abuse"}>Drug Abuse</MenuItem>
                      <MenuItem value={"Defamation"}>Defamation</MenuItem>
                      <MenuItem value={"Misc"}>Other</MenuItem>
                    </Select>
                    <TextField
                      name="message"
                      margin="normal"
                      required
                      placeholder="Please provide any relevant additional information"
                      maxRows={4}
                      variant="standard"
                      fullWidth
                      value={emailData.message}
                      onChange={onChange}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 0, mb: 3 }}
                    >
                      File Report With Administrator
                    </Button>
                  </Fragment>
                }
              </Box>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

DoctorReportForm.propTypes = {
  auth: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  patients: state.patientReducer.patients
});

export default connect(mapStateToProps, { createMessage })(DoctorReportForm);
