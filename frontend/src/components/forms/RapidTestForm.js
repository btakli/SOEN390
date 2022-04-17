// Proof of concept for sending emails to
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDoctor } from "../../redux/actions/patientActions";
import { createMessage } from "../../redux/actions/messageActions";
import { addNotification } from "../../redux/actions/notifActions";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import DraftsIcon from "@mui/icons-material/Drafts";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import emailjs from "@emailjs/browser";
import { Grid, Input } from "@mui/material";

const theme = createTheme();

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

function RapidTestForm(props) {
  const emptyEmail = {
    subject: `${props.auth.userData.first_name} ${props.auth.userData.last_name}'s Rapid Test Result`,
    email: "",
    message: "",
    result: null,
    patient_name: `${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    patient_id: props.auth.userData.user,
    reply_to: props.auth.user.email,
  };

  const [emailData, setEmailData] = useState(emptyEmail);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    props.getDoctor();
  }, []);

  useEffect(() => {
    if (emailData.result) {
      setImageUrl(URL.createObjectURL(emailData.result));
    }
  }, [emailData.result]);

  useEffect(() => {
    if (!isEmpty(props.doctor)){
      setEmailData((prevEmailData) => ({
        ...prevEmailData,
        ["email"]: props.doctor.email,
      }));
    }
  }, [props.doctor]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_9zhjcaq",
        "template_5jspopk",
        e.target,
        "Oy3KM_edlMSUHiQPq"
      )
      .then((result) =>
        console.log("Email Sent Successfully", result.status, result.text)
      )
      .catch((error) => console.log("Email Send Failed...", error));

    setEmailData(emptyEmail);

    props.createMessage({ emailSent: "Rapid Test Sent Successfully" });

    props.addNotification({
      type: "Email",
      user: props.doctor.user,
      subject: "Rapid Test Sent",
      message: `[${getFormattedDate(new Date())}] ${props.auth.userData["first_name"]} ${props.auth.userData["last_name"]} has sent a rapid test result. Please check your email.`
    });
  };

  const onChange = (e) => {
    setEmailData((prevEmailData) => ({
      ...prevEmailData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setEmailData((prevState) => ({
      ...prevState,
      result: e.target.files[0],
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <DraftsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Upload Rapid Test Result
          </Typography>
          <Box component="form" onSubmit={sendEmail}>
            <Grid container spacing={2}>
              {/* Must provide fields in form */}
              <Box sx={{ display: "none" }}>
                <TextField name="patient_name" value={emailData.patient_name} />
                <TextField name="patient_id" value={emailData.patient_id} />
                <TextField name="reply_to" value={emailData.reply_to} />
                <TextField name="email" value={emailData.email} />
              </Box>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  label="Subject"
                  name="subject"
                  id="subject"
                  autoFocus
                  fullWidth
                  value={emailData.subject}
                  onChange={onChange}
                  sx={{ mt: 3 }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="message"
                  name="message"
                  label="Add Message"
                  fullWidth
                  required
                  autoFocus
                  multiline
                  rows={4}
                  value={emailData.message}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="result">
                  <Input
                    accept="image/*"
                    fullWidth
                    required
                    id="result"
                    name="result"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    Upload Result
                  </Button>
                </label>
              </Grid>

              {imageUrl && emailData.result && (
                <Grid item xs={12}>
                  <Box mt={2} textAlign="center">
                    <Typography component="h1" variant="body1">
                      Image Preview
                    </Typography>
                    <img
                      src={imageUrl}
                      alt={emailData.result.name}
                      height="300px"
                    />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  variant="h6"
                  sx={{ color: "#757575" }}
                >
                  Send to Dr. {props.doctor.first_name} {props.doctor.last_name}
                </Typography>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

RapidTestForm.propTypes = {
  auth: PropTypes.object.isRequired,
  createMessage: PropTypes.func.isRequired,
  doctor: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  doctor: state.patientReducer.doctor,
});

export default connect(mapStateToProps, { getDoctor, createMessage, addNotification })(RapidTestForm);
