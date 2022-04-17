// Proof of concept for sending emails to
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getDoctor } from "../../redux/actions/patientActions";
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import DraftsIcon from "@mui/icons-material/Drafts";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from "@mui/material/Slider";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import emailjs from "@emailjs/browser";

const theme = createTheme();

const marks = [
  {
    value: 0,
    label: "Very Low",
  },
  {
    value: 3,
    label: "Low",
  },
  {
    value: 5,
    label: "Medium",
  },
  {
    value: 7,
    label: "High",
  },
  {
    value: 10,
    label: "Emergency",
  },
];

const getFormattedDate = (date) => {
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString('default', { month: 'long' });
  const time = `${date.getHours()}:${date.getMinutes() <= 9 ? '0' + date.getMinutes() : date.getMinutes()}`;

  return (`${month} ${day}, ${year} @ ${time}`);
};

const getPatientId = (e, patients) => {
  return patients.find(({ email }) => e === email ).user;
};  

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function getUserTitle(user){
  if(user.is_doctor){
    return "Dr. ";
  } 

  if(user.is_immigration_officer){
    return "Officer ";
  } 

  return "";

}

function ContactForm(props) {
  const { open, onClose } = props;

  const emptyEmail = {
    subject: "",
    urgency: 0,
    email: "",
    message: "",
    sender_name: `${getUserTitle(props.auth.user)}${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    sender_id: props.auth.userData.user,
    reply_to: props.auth.user.email
  };

  const [emailData, setEmailData] = useState(emptyEmail);

  useEffect(() => {
    if (props.auth.user.is_patient){
      props.getDoctor();
    }
  }, []);

  const sendFilter = (e) => {
    if (props.auth.user.is_patient){
      sendEmail(e, props.doctor.user);
    } else if (props.auth.user.is_doctor || props.auth.user.is_immigration_officer){
      sendEmail(e, getPatientId(emailData.email, props.patients));
    }
  };

  const sendEmail = (e, notifId) => {
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

    setEmailData(emptyEmail);

    props.createMessage({ emailSent: "Message Sent Successfully" });

    props.addNotification({
      type: "Email",
      user: notifId,
      subject: "Message Sent",
      message: `[${getFormattedDate(new Date())}] ${(props.auth.user.is_doctor)? "Dr. ":""}${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has sent you a message. Please check your email.`
    });

    onClose();
  };

  const onChange = (e) => {
    setEmailData(prevEmailData => ({
        ...prevEmailData,
        [e.target.name]: e.target.value
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
        <DialogTitle sx={{ bgcolor: "#101F33", color: "#fff" }}>
          Send an Email
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
        <DialogContent 
          sx={{ 
            mt: 2,
          }}
          align="center"
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <DraftsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contact Form
          </Typography>
          {(isEmpty(props.doctor) && props.patients.length == 0) ?
            <Fragment>
              <Typography variant="h3">
                No {(props.auth.user.is_doctor)? "Patients":"Doctor"}!
              </Typography>
              <Typography variant="h4">
                Please wait to be assigned{(props.auth.user.is_doctor)? " patients":""}.
              </Typography>
            </Fragment>
            :
            <Box component="form" onSubmit={sendFilter}>
              <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 2,
                    alignItems: "center"
                  }}
                >
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
                  </Box>
                  <TextField
                    margin="normal"
                    required
                    placeholder="Subject"
                    name="subject"
                    autoFocus
                    fullWidth
                    value={emailData.subject}
                    onChange={onChange}
                  />
                  <InputLabel>Urgency Scale</InputLabel>
                  <Slider
                    name="urgency"
                    defaultValue={0}
                    min={0}
                    step={1}
                    max={10}
                    valueLabelDisplay="auto"
                    marks={marks}
                    value={emailData.urgency}
                    onChange={onChange}
                    sx={{ mt: 3, mb: 2 }}
                  />
                  <Select
                    required
                    name="email"
                    label="Doctor"
                    fullWidth
                    value={emailData.email}
                    onChange={onChange}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {(props.auth.user.is_patient) ?
                      <MenuItem value={props.doctor.email}>
                        {`Dr. ${props.doctor.first_name} ${props.doctor.last_name}`}
                      </MenuItem>
                      :
                      props.patients.map((patient, i) => (
                        <MenuItem key={i} value={patient.email}>
                          {`${patient.first_name} ${patient.last_name}`}
                        </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    name="message"
                    margin="normal"
                    required
                    placeholder="Message Text"
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
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send
                  </Button>
                </Box>
              </Container>
            </Box>
          }
          
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

ContactForm.propTypes = {
  auth: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  patients: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  doctor: state.patientReducer.doctor,
  patients: state.patientReducer.patients
});

export default connect(mapStateToProps, { getDoctor, createMessage, addNotification })(ContactForm);
