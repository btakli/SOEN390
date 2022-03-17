import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addAddress } from "../../redux/actions/addressActions";

// MUI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function AddressForm(props) {

  const emptyForm = {
    name: "",
    streetNumber: "",
    streetName: "",
    city: "",
    province: "",
    postalCode: "",
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

    props.addAddress(state);

    setState(emptyForm);
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid item xs={12} sm={3}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add a New Address
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Place Name"
                  autoFocus
                  value={state.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="streetNumber"
                  required
                  fullWidth
                  id="streetNumber"
                  label="Street Number"
                  value={state.streetNumber}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="streetName"
                  required
                  fullWidth
                  id="streetName"
                  label="Street Name"
                  value={state.streetName}
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
                  name="province"
                  required
                  fullWidth
                  id="province"
                  label="Province"
                  value={state.province}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

AddressForm.propTypes = {
  addAddress: PropTypes.func.isRequired
};

export default connect(null, { addAddress })(AddressForm);
