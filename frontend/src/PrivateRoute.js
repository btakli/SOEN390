import { Navigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";

function PrivateRoute(props) {
  if (props.auth.isLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (!props.auth.isAuthenticated) {
    return <Navigate to="/prelogin" />;
  } else {
    return <Outlet />;
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
