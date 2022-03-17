import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddressForm from "../../components/forms/AddressForm";
import AddressTable from "../../components/tables/AddressTable";

// MUI
import { Card, CardContent, Typography, Grid, Divider } from "@mui/material";

function AddressTracing(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="left" gutterBottom component="div">
          {props.auth.userData.first_name}'s Address Tracing
        </Typography>

        <Divider />

        <Grid container spacing={4} sx={{ mt: 3 }} justifyContent="center">

          <AddressForm />

          <Divider orientation="vertical" flexItem sx={{ ml: 4 }} />
          
          <AddressTable />

        </Grid>
        
      </CardContent>
    </Card>
  );
}

AddressTracing.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(AddressTracing);
