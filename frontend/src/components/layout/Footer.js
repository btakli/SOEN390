import React from "react";
import Copyright from "../../components/layout/Copyright";

// MUI
import { Box, Divider } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }} >
      <Divider sx={{"width": "100%", mb: 2}} />
      <Copyright />
    </Box>
  );
}

export default Footer;
