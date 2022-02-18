import Persons from "../components/Persons";
import PersonForm from "../components/PersonForm";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../redux/actions/authActions";

// MUI
import Link from "@mui/material/Link";
import Header from "../components/Header";
import Navigator from "../components/Navigator";
import { Box, CssBaseline, Typography } from "@mui/material";
import Requests from "./Requests";
import Template2 from "./Template2";
import Template3 from "./Template3";

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

function Home(props) {
  const handleClick = (e) => {
    props.logout();
  };

  const drawerWidth = 256;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const [value, setValue] = React.useState("0");
  function passedTemplateValue(value) {
    setValue(value);
    console.log(value);
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      {/* Drawer toggled when navigation button clicked */}
      <Navigator
        PaperProps={{ style: { width: drawerWidth } }}
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header
          onDrawerToggle={handleDrawerToggle}
          templateValue={passedTemplateValue}
        />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          {value === "1" && <Requests />}
          {value === "2" && <Template2 />}
          {value === "3" && <Template3 />}
          {value === "0" && (
            <Fragment>
              <Link onClick={handleClick} variant="body2">
                {"LOGOUT"}
              </Link>
              <Persons />
              <PersonForm />
            </Fragment>
          )}
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
}

Home.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(Home);
