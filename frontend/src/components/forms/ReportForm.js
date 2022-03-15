// Proof of concept for sending emails to
import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

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

const ReportForm = (props) => {
  const { open, onClose } = props;

  const emptyEmail = {
    subject: "",
    urgency: 0,
    email: "",
    message: "",
    patient_name: `${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
    patient_id: props.auth.userData.user,
    reply_to: props.auth.user.email
  };

  const [emailData, setEmailData] = useState(emptyEmail);

  const sendEmail = (e) => {
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
    setEmailData(emptyEmail);
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
          Report a Doctor
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
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <DraftsIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Report Form
                </Typography>
                {/* Must provide fields in form */}
                <Box sx={{ display: "none" }}>
                  <TextField
                    name="patient_name"
                    value={emailData.patient_name}
                  />
                  <TextField
                    name="patient_id"
                    value={emailData.patient_id}
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
                <Select
                  required
                  name="email"
                  label="Doctor"
                  fullWidth
                  value={emailData.email}
                  onChange={onChange}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {/* TODO Redux : Populate with available doctors for patient */}
                  <MenuItem value={"delispeter19@gmail.com"}>
                    Doctor 1
                  </MenuItem>
                  <MenuItem value={"matteo.gisondi@yahoo.com"}>
                    Doctor 2
                  </MenuItem>
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
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

ReportForm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(ReportForm);
