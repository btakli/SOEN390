import * as React from "react";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/authActions";
import Navigator from "./headerComponents/Navigator";
import Mail from "./headerComponents/Mail";
import ProfileMenu from "./headerComponents/ProfileMenu";
import Notification from "./headerComponents/Notification";
import Report from './headerComponents/Report';
import EmergencyForm from "../forms/EmergencyForm";

// MUI
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import AppBar from "@mui/material/AppBar";

function Header(props) {
  const handleLogout = (e) => {
    props.logout();
  };

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };  

  const Emergency = () => {    
      return <EmergencyForm open={open} onClose={handleDialogClose}/> ;   
  };

  const EmergencyIfDoctor = () => {
    if (props.auth.user.is_doctor && !props.auth.userData.is_away) {
      return (
      <Fragment>
        <Emergency />
        <Tooltip title="Emergency">
        <Button
          variant="contained"
          onClick={handleDialogOpen}
          style={{ backgroundColor: "#DC143C" }}
        >
            Emergency Leave
          </Button>
        </Tooltip>
      </Fragment>);
    } else {
      return null; // Is this implicit?
    }
  };

  return (
    <AppBar
      color="primary"
      position="sticky"
      elevation={6}
      sx={{ zIndex: 100 }}
    >
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <Navigator home={props.home} />
          </Grid>
          <Grid item xs>
            <Typography
              color="inherit"
              variant="h5"
              align="left"
              component="h1"
            >
              CovidTracker
            </Typography>
          </Grid>
          <Grid item>
            <Mail />
          </Grid>
          <Grid item>
            <Notification />
          </Grid>
          <Grid item>
            <Report /> 
          </Grid>
          <Grid item>
            <ProfileMenu />
          </Grid>
          <Grid item>
            <EmergencyIfDoctor/>
          </Grid>
          <Grid item>
            <Tooltip title="Logout">
              <Button
                variant="contained"
                onClick={handleLogout}
                style={{ backgroundColor: "#00bcd4" }}
              >
                Logout
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Header);
