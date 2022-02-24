import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../redux/actions/authActions";
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
import Input from "@mui/material/Input";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";

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

function Register(props) {
  const emptyForm = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    proofFile: null,
  };

  // Store form data in state
  const [state, setState] = useState(emptyForm);
  const [file, setFile] = useState("");

  const handleFileChange = (event) => {
    setFile({
      selectedFile: event.target.files[0],
      selectedFileName: event.target.files[0].name,
    });
  };
  // Change form data in state at each change
  const handleChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const {
      firstname,
      lastname,
      date,
      gender,
      address,
      city,
      postalCode,
      email,
      password,
      confirmPassword,
      proofFile,
    } = state;
    state.proofFile = data.get("proofFile");
    console.log(state);
    // if (password !== confirmPassword) {
    //   props.createMessage({ passwordsDoNotMatch: "Passwords do not match" });
    // } else {
    //   const newUser = {
    //     username,
    //     email,
    //     password,
    //     proofFile,
    //   };
    //   props.register(newUser);
    // }
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
            Doctor Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  value={state.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  value={state.lastname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  name="date"
                  label="Date of birth"
                  type="date"
                  required
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={state.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
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
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
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
                  name="postalCode"
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  value={state.postalCode}
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
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={state.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <label htmlFor="proofFile">
                  <Input
                    accept="image/*"
                    fullWidth
                    required
                    id="proofFile"
                    name="proofFile"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    Upload Proof
                  </Button>
                </label>
                <Typography component="h1" variant="body1">
                  {file.selectedFileName}
                </Typography>
              </Grid>
            </Grid>
            <Divider sx={{ pt: 3 }} />
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
                <Link href="/doctorlogin" variant="body2">
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

Register.propTypes = {
  register: PropTypes.func.isRequired,
  createMessage: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
