import { React, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@mui/material";

function PrivateRoute(props) {

  useEffect(() => {

  }, []);
  
  const { redirect } = props;

  let navigate = useNavigate();

  if (props.auth.isLoading) {
    return (
      <Backdrop
        open={true}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  } else if (!props.auth.isAuthenticated) {
    navigate(`${redirect}`);
    return null;
  } else {
    return <Outlet />;
  }
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PrivateRoute);
