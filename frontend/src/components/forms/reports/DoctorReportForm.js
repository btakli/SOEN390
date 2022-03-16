import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

const DoctorReportForm = (props) => {
  const { open, onClose } = props;

  const emptyEmail = {
    // TODO : REDUX replace with random admin email
    admin_email: "matteo.gisondi@gmail.com",
    patient: "",
    // patient_id: "",
    message: "",
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
                {/* Must provide fields in form */}
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
                  Patient Involved in Incedent
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
                  {/* TODO Redux : Populate with patient objects/id/... */}
                  <MenuItem value={"Patient 1"}>Patient 1</MenuItem>
                  <MenuItem value={"Patient 2"}>Patient 2</MenuItem>
                  <MenuItem value={"Patient 3"}>Patient 3</MenuItem>
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
                  <MenuItem value={"misconduct"}>Misconduct</MenuItem>
                  <MenuItem value={"harassment"}>Harassment</MenuItem>
                  <MenuItem value={"professionalism"}>Professionalism</MenuItem>
                  <MenuItem value={"drug_abuse"}>Drug Abuse</MenuItem>
                  <MenuItem value={"defamation"}>Defamation</MenuItem>
                  <MenuItem value={"misc"}>Other</MenuItem>
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
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(DoctorReportForm);
