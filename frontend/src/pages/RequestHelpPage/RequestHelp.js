import React from 'react';

import RequestGroceryHelp from "../RequestHelpPage/RequestGroceryHelp";
import RequestInformation from "../RequestHelpPage/RequestInformation";
import RequestbyInfected from "../RequestHelpPage/RequestbyInfected";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



function RequestHelp () {

    return (
    
        <Box>       

            <Typography variant='h4'>
                Alerting Your Doctor
            </Typography>
            <Typography variant="body2" color="text.primary" justifyContent="left">
                If your current status is "Infected" and require emergency assistance, please alert your
                assigned doctor by clicking the following button.
            </Typography>
            <RequestbyInfected/>


            <Typography variant='h4'>
                Grocery Assistance
            </Typography>
            <RequestGroceryHelp/>

            <Typography variant='h4'>
                Additional Information
            </Typography>
            <RequestInformation/>

           
        </Box>
    );

}
export default RequestHelp; 