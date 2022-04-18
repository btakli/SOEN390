import { React } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Link } from "@mui/material";

function Copyright(props) {
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
        component="button"
        color="inherit"
        onClick={() => {
          navigate(`/terms-conditions`);
        }}
      >
        CovidTracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
