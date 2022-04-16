import * as React from "react";

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

export default function RequestApplicationForm() {
  const handleSignUp = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      dateOfBirth: data.get("date"),
      gender: data.get("gender"),
      address: data.get("address"),
      city: data.get("city"),
      postalCode: data.get("postalCode"),
      email: data.get("email"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
      statusType: data.get("statusType"),
    });
  };

  const [gender, setGender] = React.useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const [statusType, setStatusType] = React.useState("");
  const handleStatusTypeChange = (event) => {
    setStatusType(event.target.value);
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
          <Typography component="h1" variant="h5">
            Applicant Info
          </Typography>
          <Box component="form" onSubmit={handleSignUp} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="filled-disabled"
                label="First Name"
                defaultValue="John"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField
                disabled
                id="filled-disabled"
                label="Last Name"
                defaultValue="Doe"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="date"
                  name="date"
                  label="Date of birth"
                  type="date"
                  defaultValue="1989-12-12"
                  disabled
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <TextField
                    disabled
                    fullWidth
                    id="gender"
                    name="gender"
                    defaultValue='Male'
                    label="Gender"
                  >
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="hospital_office"
                  disabled
                  fullWidth
                  id="hospital_office"
                  defaultValue='Jewish General Hospital'
                  label="Hospital/Office"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  name="role"
                  disabled
                  fullWidth
                  id="role"
                  defaultValue='Medical Doctor'
                  label="Role"
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  name="id"
                  disabled
                  fullWidth
                  id="id"
                  defaultValue='12345678'
                  label="ID"
                />
              </Grid>
              <img src=''></img>
              <Grid item xs={12}>
              <TextField
                  name="proof"
                  disabled
                  fullWidth
                  id="proof"
                  defaultValue={<img src=''></img>}
                  label="Proof"
                />
              </Grid>
              
            </Grid>
            <Grid>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Set Status as Reviewing
            </Button>
            <Button
              type="submit"
              
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Accept
            </Button>
          
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2,  }}
            >
              Reject
            </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
