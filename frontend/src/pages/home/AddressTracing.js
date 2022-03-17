import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AddressForm from "../../components/forms/AddressForm";

// MUI
import { Card, CardContent, Typography, Divider } from "@mui/material";

function AddressTracing(props) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" align="left" gutterBottom component="div">
          {props.auth.userData.first_name}'s Address Tracing
        </Typography>

        <Divider />

        <AddressForm />
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
