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
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import Requests from "./Requests";
import PatientsList from "./PatientsList";
import PatientStatus from "./PatientStatus";
import InfectionsPerWeekGraph from "../components/graphs/InfectionsPerWeekGraph";
import InfectionsPerTypeGraph from "../components/graphs/InfectionsPerTypeGraph";

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
          {value === "2" && <PatientStatus />}
          {value === "3" && <PatientsList />}
          {value === "0" && (
            <Card>
              <CardContent>
                <Box sx={{ width: "100%" }} pb={2}>
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                    component="div"
                  >
                    Welcome User!
                  </Typography>
                  <Divider />
                </Box>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={8} md={8}>
                    <InfectionsPerWeekGraph />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4}>
                    <InfectionsPerTypeGraph />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            /*<Fragment>
              <Persons />
              <PersonForm />
            </Fragment>*/
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
