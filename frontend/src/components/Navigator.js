import { React, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Tooltip from "@mui/material/Tooltip";
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from "@mui/icons-material/Home";
import DnsRoundedIcon from "@mui/icons-material/DnsRounded";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActual";
import PublicIcon from "@mui/icons-material/Public";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponent";
import TimerIcon from "@mui/icons-material/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import PhonelinkSetupIcon from "@mui/icons-material/PhonelinkSetup";

import { backgroundColor,
    drawerStyle,
    itemStyle,
    itemTitleStyle,
    drawerTitleStyle } from "../styles/NavigatorStyles";

// To add links to other pages
// https://www.youtube.com/watch?v=CjFWbEOcq-Y

const categories = [
  {
    text: "Build",
    children: [
      {
        text: "Home",
        icon: <HomeIcon />,
        active: true,
      },
      { text: "Template 1", icon: <DnsRoundedIcon /> },
      { text: "Template 2", icon: <PermMediaOutlinedIcon /> },
      { text: "Template 3", icon: <PublicIcon /> },
      { text: "Template 4", icon: <SettingsEthernetIcon /> },
      {
        text: "Template 5",
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
  {
    text: "More",
    children: [
      { text: "Settings", icon: <SettingsIcon /> },
      { text: "Terms & Conditions", icon: <TimerIcon /> },
      { text: "About", icon: <PhonelinkSetupIcon /> },
    ],
  },
];

function Navigator() {

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
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
              background: backgroundColor
              }
          }}
      >
        <Box
            sx={ drawerStyle }
            onClick={handleDrawerClose}
            onKeyDown={handleDrawerClose}
        >
          <List disablePadding >
            <ListItem sx={drawerTitleStyle}>
                CovidTracker
            </ListItem>

            {categories.map(({ text, children }) => (
              <Box key={text} >

                  <ListItem sx={ itemTitleStyle }>
                      <ListItemText>{text}</ListItemText>
                  </ListItem>

                  {children.map(({ text, icon, active }) => (
                  <ListItem disablePadding key={text} sx={ itemStyle } >
                      <ListItemButton selected={active} >
                          <ListItemIcon>{icon}</ListItemIcon>
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

export default Navigator;