import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Tooltip from "@mui/material/Tooltip";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import SpeedIcon from "@mui/icons-material/Speed";

import {
  backgroundColor,
  drawerStyle,
  itemStyle,
  itemTitleStyle,
  drawerTitleStyle,
} from "../../../styles/NavigatorStyles";

// To add links to other pages
// https://www.youtube.com/watch?v=CjFWbEOcq-Y

const common = {
  text: "More",
  children: [
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Terms & Conditions", icon: <TimerIcon /> },
    { text: "About", icon: <PhonelinkSetupIcon /> },
  ],
};

let categories = [
  {
    text: "Pages",
    children: [],
  },
  common,
];

function Navigator(props) {
  let navigate = useNavigate();
  const home = props.home === "/" ? "" : props.home;

  const doctor_pages = [
    { text: "Home", icon: <HomeIcon /> },
    {
      text: "Patients",
      icon: <DnsRoundedIcon />,
      onClick: () => navigate(`${home}/patients`),
    },
    {
      text: "Dashboard",
      icon: <PermMediaOutlinedIcon />,
      onClick: () => navigate(`${home}/dashboard`),
    },
    {
      text: "Availabilities",
      icon: <PublicIcon />,
      onClick: () => navigate(`${home}/doctor/appointments`),
    },
    { text: "Template 4", icon: <SettingsEthernetIcon />},
    { text: "Template 5", icon: <SettingsInputComponentIcon /> },
  ];

  const patient_pages = [
    { text: "Home", icon: <HomeIcon />, onClick: () => navigate(`${home}`) },
    {
      text: "Status",
      icon: <DnsRoundedIcon />,
      onClick: () => navigate(`${home}/status`),
    },
    {
      text: "Dashboard",
      icon: <PermMediaOutlinedIcon />,
      onClick: () => navigate(`${home}/dashboard`),
    },
    {
      text: "Address Tracing",
      icon: <PublicIcon />,
      onClick: () => navigate(`${home}/addressTracing`),
    },
    {
      text: "Appointment",
      icon: <PublicIcon />,
      onClick: () => navigate(`${home}/patient/appointments`),
    },
    { text: "Template 4", icon: <SettingsEthernetIcon /> },
    {
      text: "Rapid Test Result",
      icon: <SpeedIcon />,
      onClick: () => navigate(`${home}/rapidTestResult`),
    },
    { text: "QR-Code", icon: <SettingsEthernetIcon />,
    onClick: () => navigate(`${home}/qr-code`), },
    { text: "Template 5", icon: <SettingsInputComponentIcon /> },
  ];

  categories[0]["children"] = props.auth.user.is_doctor
    ? doctor_pages
    : patient_pages;

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Tooltip title="Navigation">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          // sx={{ mr: 2,
          //     // to make the button disapear when not open
          //     //  ...(open && { display: 'none' })
          //      }}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>

      <Drawer
        variant="temporary"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
        PaperProps={{
          sx: {
            background: backgroundColor,
          },
        }}
      >
        <Box
          sx={drawerStyle}
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List disablePadding>
            <ListItem sx={drawerTitleStyle}>CovidTracker</ListItem>

            {categories.map(({ text, children }) => (
              <Box key={text}>
                <ListItem sx={itemTitleStyle}>
                  <ListItemText>{text}</ListItemText>
                </ListItem>

                {children.map(({ text, icon, onClick }) => (
                  <ListItem disablePadding key={text} sx={itemStyle}>
                    <ListItemButton onClick={onClick}>
                      <ListItemIcon sx={{ color: "#fff" }}>{icon}</ListItemIcon>
                      <ListItemText>{text}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                ))}

                {/* <Divider sx={{ mt: 3 }} color="#fff" /> */}
              </Box>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

Navigator.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Navigator);
