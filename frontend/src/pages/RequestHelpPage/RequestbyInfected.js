import React, { useState } from "react";
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
    palette: {
      alertEmergency: {
        main: '#e6553c',
        contrastText: '#fff',
      },
    },
  });

function RequestbyInfected () {

    const [isNotInfected, setIsNotInfect] = useState(false); 


    const handleClick = () => {
        alert("Your doctor has been notified of your emergency.");
    };

    return (
        <ThemeProvider theme={theme}>
            <Button 
                variant="contained"
                onClick= {handleClick} 
                color="alertEmergency"
                disabled={isNotInfected}
                sx={{
                    marginBottom: 3,
                }}>
                    Emergency Alert
            </Button>
        </ThemeProvider>
    );

}
export default RequestbyInfected;