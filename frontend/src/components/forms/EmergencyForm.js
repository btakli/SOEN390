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

const EmergencyForm = (props) => {
  const { open, onClose } = props;

  const emptyEmail = {
    // TODO : REDUX replace with random admin email
    admin_email: "matteo.gisondi@gmail.com",
    patient: "",
    // patient_id: "",
    message: "",
    start_date:"",
    end_date:"",
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
          Emergency Absence - Reassign All Patients
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
                {/*<Avatar sx={{ mt: 0, mb: 3, bgcolor: "secondary.main" }}>
                  <ReportIcon />
              </Avatar>*/}
                <Typography component="h1" variant="h5" sx={{pb : 5}}>
                  Select Absence Date
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
                  StartDate
                </InputLabel>
                <TextField
                  sx={{pb : 5}}
                  id="start_date"
                  name="start_date"
                  label="Start Date"
                  type="date"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={emailData.start_date}
                  onChange={onChange}
                />
                {/*<Select
                  required
                  labelId="patient-label"
                  name="patient"
                  label="Patient"
                  fullWidth
                  value={emailData.patient}
                  onChange={onChange}
                  sx={{ mt: 0, mb: 3 }}
                >                  
                  <MenuItem value={"Patient 1"}>Patient 1</MenuItem>
                  <MenuItem value={"Patient 2"}>Patient 2</MenuItem>
                  <MenuItem value={"Patient 3"}>Patient 3</MenuItem>
                </Select>*/}
                <InputLabel id="reason-label" >End Date</InputLabel>
                <TextField
                  sx={{pb : 5}}
                  id="end_date"
                  name="end_date"
                  label="End Date"
                  type="date"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={emailData.end_date}
                  onChange={onChange}
                />
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
                  Send To Administrator
                </Button>
              </Box>
            </Container>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

EmergencyForm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(EmergencyForm);
