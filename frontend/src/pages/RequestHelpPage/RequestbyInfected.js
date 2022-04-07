import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";
import { getAllStatus } from "../../redux/actions/statusActions";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";

const theme = createTheme({
  palette: {
    alertEmergency: {
      main: "#e6553c",
      contrastText: "#fff",
    },
  },
});

function getLatestStatus(statusArr) {
  let latestDate = new Date("2000");
  let latestStatus = {};

  statusArr.forEach((status) => {
    const date = new Date(status.date);
    if (date > latestDate) {
      latestDate = date;
      latestStatus = status;
    }
  });

  return latestStatus;
}

function isEmpty(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
}

function RequestByInfected(props) {
  const [isNotInfected, setIsNotInfected] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.getAllStatus();
  }, []);

  useEffect(() => {
    if (props.allStatus.length != 0) {
      const latestStatus = getLatestStatus(props.allStatus);
      if (!isEmpty(latestStatus) && latestStatus.status === "Infected") {
        setIsNotInfected(true); // when the patient is not infected then button is disabled
      } else {
        setIsNotInfected(false); // when the patient is infected then the button is disabled
      }
    }
  }, [props.allStatus]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    setOpen(true);

    e.preventDefault();

    //need to populate params with redux
    emailjs
      .send(
        "service_7fjr35n",
        "template_6z43fbi",
        {
          patient_name: `${props.auth.userData.first_name} ${props.auth.userData.last_name}`,
          reply_to: `${props.auth.userData.email}`,
        }, //params
        "2kKwY7XTMZzK4SSte"
      )
      .then(
        function (response) {
          console.log(
            "An email has been sent on your behalf notifying your doctor.",
            response.status,
            response.text
          );
        },
        function (error) {
          console.log(
            "Your emergency was not emailed to your doctor. Good luck, dude",
            error
          );
        }
      );
  };

  return (
    <ThemeProvider theme={theme}>
      {isNotInfected && (
        <Box sx={{ m: 2 }}>
          <Typography sx={{ m: 1 }} variant="h4">
            Alerting Your Doctor
          </Typography>
          <Typography
            sx={{ m: 1 }}
            variant="body2"
            color="text.primary"
            justifyContent="left"
          >
            If your current status is "Infected" and require emergency
            assistance, please alert your assigned doctor by clicking the
            following button.
          </Typography>
          <Button
            variant="contained"
            onClick={handleClick}
            color="alertEmergency"
            sx={{
              m: 1,
            }}
          >
            Emergency Alert
          </Button>
        </Box>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="emergency-title"
        aria-describedby="emergency-description"
      >
        <DialogTitle id="emergency-title">
          {"Emergency Alert Confirmation"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="emergency-description">
            Your request has been processed.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

RequestByInfected.propTypes = {
  allStatus: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
  allStatus: state.statusReducer.allStatus,
});

export default connect(mapStateToProps, { getAllStatus })(RequestByInfected);
