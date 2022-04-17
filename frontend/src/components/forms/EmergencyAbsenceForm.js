import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import emailjs from "@emailjs/browser";
import { toggleIsAway } from '../../redux/actions/authActions';

const theme = createTheme();

function EmergencyAbsenceForm(props) {
  const { open, onClose } = props;

  const emptyEmail = {
    admin_email: "delispeter19@gmail.com",
    message: "",
    start_date:"",
    end_date:"",
    doctor_name: `Dr. ${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    doctor_id: props.auth.userData.user,
    reply_to: props.auth.user.email
  };

  const [emailData, setEmailData] = useState(emptyEmail);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_7fml1kh",
        "template_zld2w6m",
        emailData,
        "LRUKM9mZ4TnU7IgU9"
      )
      .then((result) =>
        console.log("Email Sent Successfully", result.status, result.text)
      )
      .catch((error) => console.log("Email Send Failed...", error));
    setEmailData(emptyEmail);
    props.toggleIsAway();
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
                <Typography component="h1" variant="h5" sx={{pb : 5}}>
                  Select Absence Date
                </Typography>

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

EmergencyAbsenceForm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, {toggleIsAway})(EmergencyAbsenceForm);
