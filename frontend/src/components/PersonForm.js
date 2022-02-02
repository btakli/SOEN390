import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addPerson } from '../actions/personActions';

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();


function PersonForm(props) {

    const emptyForm = {
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: ""
    }
  
    // Store form data in state
    const [state, setState] = useState(emptyForm);

    // Change form data in state at each change
    const onChange = e => 
        setState(prevState => ({
            ...prevState,
            [e.target.name]:e.target.value
        }))

    const onSubmit = e =>{
        e.preventDefault();
        props.addPerson(state);
        setState(emptyForm)
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
                <Avatar sx={{ m: 1 }}>
                <AccountBoxIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Add Person
                </Typography>
                <Box component="form" onSubmit={onSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        name="first_name"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        value = {state.first_name}
                        onChange = {onChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="last_name"
                        autoComplete="family-name"
                        value = {state.last_name}
                        onChange = {onChange}
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
                        value = {state.email}
                        onChange = {onChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="date"
                        name="date_of_birth"
                        label="Date of birth"
                        type="date"
                        required
                        fullWidth
                        InputLabelProps={{
                        shrink: true,
                        }}
                        value = {state.date_of_birth}
                        onChange = {onChange}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    POST
                </Button>
                </Box>
            </Box>
            </Container>
        </ThemeProvider>
    );
}

PersonForm.propTypes = {
    addPerson: PropTypes.func.isRequired
};

export default connect(null, { addPerson })(PersonForm);
