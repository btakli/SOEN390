import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";
import Copyright from "../../components/layout/Copyright";
import MainAlerts from "../../components/layout/MainAlerts";

// MUI
import { Box, CssBaseline } from "@mui/material";

function Home(props) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header home={props.home} admin_email={props.admin_email} />
        <MainAlerts />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
