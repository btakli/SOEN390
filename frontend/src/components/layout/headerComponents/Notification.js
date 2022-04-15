import { React, Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getNotifications, deleteNotification } from "../../../redux/actions/notifActions";
import { createMessage } from "../../../redux/actions/messageActions";

// MUI
import NotificationsIcon from "@mui/icons-material/Notifications";
import WarningIcon from '@mui/icons-material/Warning';
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import {
  Menu,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  IconButton,
  Badge
} from "@mui/material";

function Notification(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [readNotifIds, setReadNotifIds] = useState(new Set());

  const handleOpenNotif = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseNotif = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    props.getNotifications();
  }, []);

  const handleClick = (id) => {
    let newSet = new Set(readNotifIds);
    if (newSet.has(id)){
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setReadNotifIds(newSet);
  };

  const submitReadNotifs = () => {
    if (readNotifIds.size > 0) {
      readNotifIds.forEach((id) => {
        props.deleteNotification(id);
      });
      props.createMessage({
        deleteNotif: 'Notifications Marked as Read'
      });
      setReadNotifIds(new Set());
      props.getNotifications();
    }
  };

  return (
    <Fragment>
      <Tooltip title="Notifications">
      
        <IconButton 
          size="large"
          aria-label="notifs"
          color="inherit"
          onClick={handleOpenNotif}
        >
          <Badge badgeContent={props.notifs.length} color="error" sx={{right: 7}}>
            <NotificationsIcon />
          </Badge>
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
        <Stack direction="row">
          <Typography
            sx={{ px: "20px", py: "5px", bgcolor: "#101F33", color: "#fff", width: "50%"}}
            textAlign="left"
            variant="h6"
            component="div"
          >
            Notifications ({props.notifs.length})
          </Typography>

          <Typography
            sx={{ px: "20px", py: "5px", bgcolor: "#101F33", color: "#fff", width: "40%"}}
            textAlign="right"
            variant="h6"
            component="div"
          >
            Read ({readNotifIds.size})
            
          </Typography>
          <Typography
            sx={{ pl: "5px", bgcolor: "#101F33", color: "#fff", width: "10%"}}
            textAlign="left"
            variant="h6"
            component="div"
          >
            <IconButton
              edge="start"
              color="inherit"
              onClick={submitReadNotifs}
            >
              { (readNotifIds.size > 0) ? <MarkEmailReadIcon /> : <MarkunreadIcon /> }
            </IconButton>
          </Typography>
        </Stack>
        
        { (props.notifs.length == 0) && 
          <ListItem
            divider
            disablePadding
            sx={{ minWidth: "400px", maxWidth: "400px" }}
          >
            <ListItemButton>
              <EmailIcon />
              <ListItemText
                primary="No Messages!"
                secondary="You have no Notifications"
                sx={{ pl: "20px" }}
              />
            </ListItemButton>
          </ListItem> }

        {props.notifs.map((item, i) => (
          <ListItem
            key={i}
            divider
            disablePadding
            sx={{ minWidth: "400px", maxWidth: "400px", bgcolor: `${(readNotifIds.has(item.id))? "#dce9fa": "white"}` }}
          >
            <ListItemButton onClick={() => handleClick(item.id)}>
              {item.type === "Email" ? (
                <EmailIcon />
              ) : item.type === "Assignment" ? (
                <PersonIcon />
              ) : item.type === "InfectedAlert" ? (
                <WarningIcon />
              ) : (
                <EventIcon />
              )}
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

export default connect(mapStateToProps, { getNotifications, deleteNotification, createMessage })(Notification);
