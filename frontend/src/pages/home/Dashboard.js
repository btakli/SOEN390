import { React } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import InfectionsPerWeekGraph from "../../components/graphs/InfectionsPerWeekGraph";
import InfectionsPerTypeGraph from "../../components/graphs/InfectionsPerTypeGraph";
import AppointmentTable from "../../components/tables/AppointmentTable";
import AvailabilityForm from "../../components/forms/AvailabilityForm";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
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

        { props.auth.user.is_doctor ?
            <Grid container spacing={3}>
                <Grid item xs={12} sm={4} md={4}>
                    <AppointmentTable />
                </Grid>

                <Grid item xs={12} sm={8} md={8}>
                    <AvailabilityForm />
                </Grid>
            </Grid>
            :
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
