import React, { Fragment, useState } from "react";
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

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function PatientReportForm(props) {
  const { open, onClose, admin_email } = props;

  const emptyEmail = {
    admin_email: admin_email,
    doctor_name: "",
    message: "",
    reason: "",
    patient_name: `${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    patient_id: props.auth.userData.user,
    reply_to: props.auth.user.email,
  };

  const [emailData, setEmailData] = useState(emptyEmail);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_7fml1kh",
        "template_ypf730n",
        emailData,
        "LRUKM9mZ4TnU7IgU9"
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
          File a Report Against a Doctor
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
                {(isEmpty(props.doctor)) ?
                  <Fragment>
                    <Typography variant="h3">
                      No Doctor!
                    </Typography>
                    <Typography variant="h4">
                      Please wait to be assigned.
                    </Typography>
                  </Fragment>
                  :
                  <Fragment>
                    <Box sx={{ display: "none" }}>
                      <TextField
                        name="patient_name"
                        value={emailData.patient_name}
                      />
                      <TextField name="patient_id" value={emailData.patient_id} />
                      <TextField
                        name="patient_email"
                        value={emailData.patient_email}
                      />
                      <TextField name="reply_to" value={emailData.reply_to} />
                      <TextField name="admin_email" value={emailData.admin_email} />
                    </Box>
                    <InputLabel id="doctor-label">
                      Doctor Involved in Incident
                    </InputLabel>
                    <Select
                      required
                      labelId="doctor-label"
                      name="doctor_name"
                      label="Doctor"
                      fullWidth
                      value={emailData.doctor_name}
                      onChange={onChange}
                      sx={{ mt: 0, mb: 3 }}
                    >
                      <MenuItem value={`Dr. ${props.doctor.first_name} ${props.doctor.last_name} (${props.doctor.user})`}>
                        {`Dr. ${props.doctor.first_name} ${props.doctor.last_name}`}
                      </MenuItem>
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
                      <MenuItem value={"Procedural"}>Procedural Error</MenuItem>
                      <MenuItem value={"Misinformation"}>Misinformation</MenuItem>
                      <MenuItem value={"Prescription"}>Harmful Prescription</MenuItem>
                      <MenuItem value={"Professionalism"}>Professionalism</MenuItem>
                      <MenuItem value={"Negligence"}>Negligence</MenuItem>
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
                      inputProps={{
                        minLength: 20,
                      }}
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

PatientReportForm.propTypes = {
  auth: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  doctor: state.patientReducer.doctor
});

export default connect(mapStateToProps, { createMessage })(PatientReportForm);
