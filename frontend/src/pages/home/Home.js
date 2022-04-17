import React from 'react';
import { Outlet } from "react-router-dom";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import MainAlerts from '../../components/layout/MainAlerts';

// MUI
import {
  Box,
  CssBaseline
} from "@mui/material";


function Home(props) {

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header home={props.home} admin_email={props.admin_email}/>
        <MainAlerts />
        <Box component="main" sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}>
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default Home;
