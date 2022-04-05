import { React, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotifications } from "../../../redux/actions/notifActions";

// MUI
import NotificationsIcon from "@mui/icons-material/Notifications";
import WarningIcon from '@mui/icons-material/Warning';
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import IconButton from "@mui/material/IconButton";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  Menu,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function Notification(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotif = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    props.getNotifications();
  }, []);

  return (
    <Fragment>
      <Tooltip title="Notifications">
      
        <IconButton 
          size="large"
          aria-label="notifs"
          color="inherit"
          onClick={handleOpenNotif}
        >
          <NotificationsIcon />
        </IconButton>
      </Tooltip>

      <Menu
        sx={{ mt: "45px", maxHeight: 400 }}
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
          sx={{ px: "20px", bgcolor: "#101F33", color: "#fff" }}
          textAlign="left"
          variant="h6"
          component="div"
        >
          Notifications
        </Typography>
        {props.notifs.map((item, i) => (
          <ListItem
            key={i}
            onClick={handleCloseNotif}
            divider
            disablePadding
            sx={{ minWidth: "400px", maxWidth: "400px" }}
          >
            <ListItemButton>
              {item.type === "Email" ? (
                <EmailIcon />
              ) : item.type === "Assignment" ? (
                <PersonIcon />
              ) : item.type === "InfectedAlert" ? (
                <WarningIcon />
              ) : item.type === "Emergency" ? (
                  <CrisisAlertIcon/>
              ) : (
                <EventIcon />
              )}{" "}
              <ListItemText
                primary={item.subject}
                secondary={item.message}
                sx={{ pl: "20px" }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </Menu>
    </Fragment>
  );
}

Notification.propTypes = {
  notifs: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifs: state.notifReducer.notifications,
});

export default connect(mapStateToProps, { getNotifications })(Notification);
