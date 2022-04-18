import React from "react";
import Copyright from "../../components/layout/Copyright";

// MUI
import { Box } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
        <Copyright />
    </Box>
  );
}

export default Footer;
