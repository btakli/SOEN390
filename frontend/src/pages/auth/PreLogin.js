import * as React from "react";
import { useNavigate } from "react-router-dom";

import CopyrightAuth from "../../components/layout/CopyrightAuth";

// MUI
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  Button,
  CssBaseline,
  FormControlLabel,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";

import Image from "../../media/preLoginImage.jpg";

const theme = createTheme();

export default function PreLogin() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("patient") === "patient") {
      navigate("/patient/login");
    } else if (data.get("doctor") === "doctor") {
      navigate("/doctor/login");
    } else if (data.get("immigrationOfficer") === "immigrationOfficer") {
      navigate("/immigration-officer/login");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              verticalAlign: "middle",
            }}
          >
            <Typography component="h1" variant="h4" sx={{ pb: 3 }}>
              CovidTracker
            </Typography>
            <Divider />
            <Typography component="h1" variant="h5">
              Select the type of User
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="doctor"
                    id="doctor"
                    name="doctor"
                    control={<Radio />}
                    label="Doctor"
                  />
                  <FormControlLabel
                    value="patient"
                    id="patient"
                    name="patient"
                    control={<Radio />}
                    label="Patient"
                  />
                  <FormControlLabel
                    value="immigrationOfficer"
                    id="immigrationOfficer"
                    name="immigrationOfficer"
                    control={<Radio />}
                    label="Immigration Officer"
                  />
                </RadioGroup>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
              <CopyrightAuth sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
