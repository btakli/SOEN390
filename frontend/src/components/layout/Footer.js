import { React } from "react";
import {
    Box,
    Typography,
    Link
} from "@mui/material";

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="https://youtu.be/dQw4w9WgXcQ">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}.
      </Typography>
    );
  }

function Footer(){

  return (
    <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
        <Copyright />
    </Box>
  )
}

export default Footer;
