import { Fragment } from "react";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider    
  } from "@mui/material";

function TermsAndConditions(){
    return (
        <Card>
            <CardContent>
            <Box sx={{ width: "100%" }} pb={2}>
                <Typography
                variant="h5"
                align="left"
                gutterBottom
                component="div"
                >
                    Terms and Conditions
                </Typography>
                <Divider />
            </Box>

            <Box sx={{ width: "100%" }} pb={2}>
                <Typography
                    variant="h5"
                    gutterBottom
                    component="div"
                >
                    BE RESPECTFUL or we ban you forever!
                </Typography>
            </Box>
  
              
            </CardContent>
        </Card>
    )
}

export default TermsAndConditions;