import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import RapidTestForm from "../../components/forms/RapidTestForm";

// MUI
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";

function RapidTest(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="left" gutterBottom component="div">
          {props.auth.userData.first_name}'s Rapid Test Result
        </Typography>

        <Divider />

        <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">
          <RapidTestForm />
        </Grid>
      </CardContent>
    </Card>
  );
}

RapidTest.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(RapidTest);
