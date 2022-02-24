import * as React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../redux/actions/authActions";

//MUI
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Badge, Menu, MenuItem } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import ContactForm from "./ContactForm";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Header(props) {
  const { onDrawerToggle, templateValue } = props;
  const [value, setValue] = React.useState("0");
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };

  const handleDialogClose = () => {
    setIsOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = (e) => {
    props.logout();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.templateValue(newValue);
  };

  return (
    <React.Fragment>
      <ContactForm isOpen={isOpen} handleClose={handleDialogClose} />
      <AppBar color="primary" position="sticky" elevation={4}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "block", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
                style={{ backgroundColor: "#00bcd4" }}
              >
                <MenuIcon />
              </IconButton>
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
              <Tooltip title="Mails">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={handleDialogOpen}
                >
                  <Badge badgeContent={4} color="error">
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Notifications">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0.5 }}
                >
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      ></AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="error"
          centered
          style={{ backgroundColor: "#00bcd4" }}
        >
          <Tab label="Dashboard" value="0" />
          <Tab label="Requests" value="1" />
          <Tab label="Status" value="2" />
          <Tab label="Patients List" value="3" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Header);
