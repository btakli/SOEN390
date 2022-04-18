import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";

function CopyrightAuth(props) {
  let navigate = useNavigate();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://youtu.be/dQw4w9WgXcQ"
        target="_blank"
      >
        CovidTracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default CopyrightAuth;
