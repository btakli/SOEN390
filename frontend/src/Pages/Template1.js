import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/authActions";

// MUI

import { Box, Button } from "@mui/material";

function Template1(props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
    </Box>
  );
}

Template1.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Template1);
