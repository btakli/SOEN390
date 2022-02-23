// Proof of concept for sending emails to

import React, { useState, useEffect } from "react";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import DraftsIcon from '@mui/icons-material/Drafts';
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Slider from '@mui/material/Slider';
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import emailjs from '@emailjs/browser';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://youtu.be/dQw4w9WgXcQ">
        CovidTracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const marks = [
  {
    value: 0,
    label: 'Very Low',
  },
  {
    value: 3,
    label: 'Low',
  },
  {
    value: 5,
    label: 'Medium',
  },
  {
    value: 7,
    label: 'High',
  },
  {
    value: 10,
    label: 'Emergency',
  },
];

const ContactForm = () => {
  const [formState, setFormState] = useState({
    values: {
      "subject": "",
      "urgency": 0,
      "email": "",
      "message": "",
      // TODO Redux : Should be populated by Redux
      "patient_name": "Patient Name",
      "patient_id": "Patient ID",
      "reply_to": "patient.email@client.com"
    }
  });

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_o5sf8uk', 'template_v5kh4dw', e.target, 'user_vnRqkOKsChMYAMYL7GxKC')
    .then((result) => console.log('Email Sent Successfully', result.status, result.text))
    .catch(error => console.log('Email Send Failed...', error));
  };

  useEffect(() => {
    setFormState(formState => ({
      ...formState
    }));
  }, [formState.values]);

  const onChange = (e) => {
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value
      }
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <form name="contact-form" onSubmit={sendEmail}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <DraftsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Contact Form
            </Typography>
            {/* Must provide fields in form */}
            <Box sx={{ display: 'none' }}>
              <TextField
                name="patient_name"
                value={formState.values.patient_name}
              />
              <TextField
                name="patient_id"
                value={formState.values.patient_id}
              />
              <TextField
                name="reply_to"
                value={formState.values.reply_to}
              />
            </Box>
            <TextField
              margin="normal"
              required
              placeholder="Subject"
              name="subject"
              autoFocus
              fullWidth
              value={formState.values.subject}
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
              value={formState.values.urgency}
              onChange={onChange}
              sx={{ mt: 3, mb: 2 }}
            />
            <Select
              required
              name="email"
              label="Doctor"
              fullWidth
              value={formState.values.email}
              onChange={onChange}
              sx={{ mt: 3, mb: 2 }}
            >
              {/* TODO Redux : Populate with available doctors for patient */}
              <MenuItem value={"matteo.gisondi@gmail.com"}>
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
              value={formState.values.message}
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
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </form>
    </ThemeProvider>
  );
};

export default ContactForm;
