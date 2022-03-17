import { React } from "react";

import PropTypes from "prop-types";
import PatientListDisplay from "./PatientListDisplay";

import {
    Grid,
    Card,
    CardContent, 
  } from "@mui/material";


function PatientTogglePage(props){

  return (

    <Card>
        <CardContent>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <PatientListDisplay />
            </Grid>
        </Grid>
        </CardContent>


    </Card>




  )
}

PatientTogglePage.propTypes = {
    auth: PropTypes.object.isRequired,
};



export default (PatientTogglePage);