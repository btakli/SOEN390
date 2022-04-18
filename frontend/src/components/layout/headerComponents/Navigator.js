import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI
import {
  Box,
  Drawer,
  CssBaseline,
  Tooltip,
  List,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";
import HelpIcon from "@mui/icons-material/Help";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import SpeedIcon from "@mui/icons-material/Speed";

import {
  backgroundColor,
  drawerStyle,
  itemStyle,
  itemTitleStyle,
  drawerTitleStyle,
} from "../../../styles/NavigatorStyles";

function Navigator(props) {
  let navigate = useNavigate();

  const home = props.home === "/" ? "" : props.home;

  const common = {
    text: "More",
    children: [
      {
        text: "Settings",
        icon: <SettingsIcon />,
        onClick: () => navigate(`${home}/settings`),
      },
      {
        text: "Terms & Conditions",
        icon: <TimerIcon />,
        onClick: () => navigate(`${home}/terms-conditions`),
      },
      {
        text: "About",
        icon: <PhonelinkSetupIcon />,
        onClick: () => navigate(`${home}/about`),
      },
    ],
  };

  const doctor_pages = [
    { text: "Home", icon: <HomeIcon />, onClick: () => navigate(`${home}/`) },
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
  ];

  const immigration_officer_pages = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate(`${home}/dashboard`),
    },
    {
      text: "Immigrants",
      icon: <DnsRoundedIcon />,
      onClick: () => navigate(`${home}/immigrants`),
    },
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
    {
      text: "CAN Covid19 Data",
      icon: <AnalyticsIcon />,
      onClick: () => navigate(`${home}/patient/canada-CovidAPI`),
    },
    {
      text: "USA Covid19 Data",
      icon: <AnalyticsIcon />,
      onClick: () => navigate(`${home}/patient/usa-CovidAPI`),
    },
    {
      text: "Request Help",
      icon: <HelpIcon />,
      onClick: () => navigate(`${home}/patient/requestHelp`),
    },
    {
      text: "Rapid Test Result",
      icon: <SpeedIcon />,
      onClick: () => navigate(`${home}/rapid-test-result`),
    },
    {
      text: "QR-Code",
      icon: <SettingsEthernetIcon />,
      onClick: () => navigate(`${home}/qr-code`),
    },
  ];

  let categories = [
    {
      text: "Pages",
      children: [],
    },
    common,
  ];

  categories[0]["children"] = props.auth.user.is_doctor
    ? doctor_pages
    : props.auth.user.is_immigration_officer
    ? immigration_officer_pages
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
