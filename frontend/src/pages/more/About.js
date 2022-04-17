import { Fragment } from "react";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider    
  } from "@mui/material";

function About(){
    return (
        <Card align="center">
            <CardContent>
            <Box sx={{ width: "100%" }} pb={2}>
                <Typography
                variant="h5"
                align="left"
                gutterBottom
                component="div"
                >
                    About CovidTracker
                </Typography>
                <Divider />
            </Box>

            <Box sx={{ width: "100%" }} pb={2}>
                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                >
                    CovidTracker is here to provide a meaningful service to Patients, Doctors and Immigration Officers!
                </Typography>

                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ width: "30%" }}
                >
                    Patients can plan appointments, update their health and immigration status, be up to date on Covid-19 data and get the help they need. 
                </Typography>

                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ width: "30%" }}
                >
                    Doctors can set availabilities and view their patients' status. 
                </Typography>

                <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    sx={{ width: "30%" }}
                >
                    Immigration Officers can view their immigrants' status. 
                </Typography>

                <Typography
                    variant="h4"
                    gutterBottom
                    component="div"
                    sx={{ width: "30%" }}
                >
                    ... and Much MuCH MORE! 
                </Typography>

                <Typography
                    variant="body"
                    gutterBottom
                    component="div"
                    sx={{ width: "30%" }}
                >
                    (see <a href="https://github.com/btakli/SOEN390" target="_blank">github</a> for more details) 
                </Typography>
            </Box>  
              
            </CardContent>
        </Card>
    )
}

export default About;