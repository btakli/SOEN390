import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InfectionsPerWeekGraph from "../../components/graphs/InfectionsPerWeekGraph";
import InfectionsPerTypeGraph from "../../components/graphs/InfectionsPerTypeGraph";

import DoctorAppointmentTable from "../../components/tables/DoctorAppointmentTable";
import ImmigrantTable from "../../components/tables/ImmigrantTable";
import AvailabilityForm from "../../components/forms/AvailabilityForm";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider    
  } from "@mui/material";
  
function Dashboard(props){

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
                  Welcome {props.auth.userData.first_name}!
              </Typography>
              <Divider />
          </Box>

            {props.auth.user.is_doctor &&
              <Grid 
                  container
              >
                  <Grid item xs={6} md={6}>
                      <DoctorAppointmentTable />
                  </Grid>

                  <Grid item xs={6} md={6}>
                      <AvailabilityForm />
                  </Grid>
              </Grid>
            }

            {props.auth.user.is_immigration_officer &&
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                      <ImmigrantTable />
                  </Grid>
              </Grid>
            }

            {props.auth.user.is_patient &&
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={6}>
                      <InfectionsPerWeekGraph />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                      <InfectionsPerTypeGraph />
                  </Grid>
              </Grid>
            }
          </CardContent>
      </Card>
    )
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(Dashboard);
