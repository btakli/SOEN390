import { React, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI
import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem, Divider } from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";

const menu = [
  "Notification 1",
  "Notification 2",
  "Notification 3",
  "Notification 4",
];

function NotifMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotif = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <Tooltip title="Notifications">
        <IconButton color="inherit" onClick={handleOpenNotif} sx={{ p: 0.5 }}>
          <NotificationsIcon />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px", width: "400px" }}
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseNotif}
      >
        <Typography
          sx={{ pl: "20px", bgcolor: "#101F33", color: "#fff" }}
          textAlign="left"
          variant="h6"
          component="div"
        >
          Notifications
        </Typography>
        {menu.map((item) => (
          <MenuItem key={item} onClick={handleCloseNotif} divider>
            <Typography textAlign="left" noWrap>
              <NotificationsIcon /> {item}
              <Typography textAlign="center" noWrap>
                Blablablablabalbalblablalbalblablalbalblalbalbfdsfsdfsdfsdfsd
              </Typography>
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

NotifMenu.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(NotifMenu);
