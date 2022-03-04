import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerPatient } from "../redux/actions/authActions";
import { createMessage } from "../redux/actions/messageActions";
import { Navigate } from "react-router-dom";

// MUI
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import { MenuItem, InputLabel, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

function PatientSignUp(props) {

  const emptyForm = {
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    gender: "",
    address: "",
    city: "",
    postal_code: ""
  };

  // Store form data in state
  const [state, setState] = useState(emptyForm);
  
  // Change form data in state at each change
  const handleChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      email,
      password,
      confirm_password,
      first_name,
      last_name,
      date_of_birth,
      gender,
      address,
      city,
      postal_code
    } = state;

    if (password !== confirm_password) {
      props.createMessage({ passwordsDoNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        email,
        password,
        first_name,
        last_name,
        date_of_birth,
        gender,
        address,
        city,
        postal_code
      };
      props.registerPatient(newUser);
    }
  };

  if (props.isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Patient Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="first_name"
                  required
                  fullWidth
                  id="first_name"
                  label="First Name"
                  autoFocus
                  value={state.first_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  name="last_name"
                  autoComplete="family-name"
                  value={state.last_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date_of_birth"
                  name="date_of_birth"
                  label="Date of birth"
                  type="date"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={state.date_of_birth}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required >
                  <InputLabel id="gender">Gender</InputLabel>
                  <Select
                    required
                    fullWidth
                    id="gender"
                    name="gender"
                    label="Gender"
                    value={state.gender}
                    onChange={handleChange}
                  >
                    <MenuItem value={"M"}>Male</MenuItem>
                    <MenuItem value={"F"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  value={state.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="City"
                  value={state.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="postal_code"
                  required
                  fullWidth
                  id="postal_code"
                  label="Postal Code"
                  value={state.postal_code}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={state.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={state.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  value={state.confirm_password}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/patient/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

PatientSignUp.propTypes = {
  registerPatient: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { registerPatient, createMessage })(PatientSignUp);
