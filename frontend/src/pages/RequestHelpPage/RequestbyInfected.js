import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import emailjs from "@emailjs/browser";

const theme = createTheme({
    palette: {
      alertEmergency: {
        main: '#e6553c',
        contrastText: '#fff',
      },
    },
  });

function RequestbyInfected () {

    const [isNotInfected, setIsNotInfected] = useState(false); 
    const [open, setOpen] = useState(false);

    const handleClose = () => {
    setOpen(false);
  };

   const handleClick = (e) => {
        setOpen(true);

        e.preventDefault();
    
        //need to populate params with redux
        emailjs.send(
            "service_7fjr35n", 
            "template_6z43fbi", 
            {patient_name: "Iron Man", reply_to: "ineke.kim@gmail.com"}, //params
            "2kKwY7XTMZzK4SSte")
        .then(function(response) {
          console.log('An email has been sent on your behalf notifying your doctor.', response.status, response.text);
       }, function(error) {
          console.log('Your emergency was not emailed to your doctor. Good luck, dude', error);
       });
    };

    //function that sets isNotInfected variable in order to disable the button. default is false to enable button
    const infectionStatus = () => {
        if (false) //to be replaced with patient's infection status  
        {
            return setIsNotInfected(true); //when the patient is not infected then button is disabled
        }
        else
        {
            return setIsNotInfected(false); //when the patient is infected then the button is disabled
        };
    };

    

    return (
        <ThemeProvider theme={theme}>
            {infectionStatus}
            <Button 
                variant="contained"
                onClick= {handleClick} 
                color="alertEmergency"
                disabled={isNotInfected}
                sx={{
                    marginBottom: 3,
                }}
            >
                Emergency Alert
            </Button>

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


export default RequestbyInfected;



