import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/authActions";

// MUI
import { Box } from "@mui/material";

function Template3(props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
        YOOOO
      </Box>
    </Box>
  );
}

Template3.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Template3);
