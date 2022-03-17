import { React } from "react";
import PatientListDisplay from "./PatientListDisplay";

import {
    Grid,
    Card,
    CardContent, 
  } from "@mui/material";


function PatientTogglePage(){

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

export default (PatientTogglePage);