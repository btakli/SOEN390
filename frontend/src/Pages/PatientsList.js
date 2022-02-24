import { connect } from "react-redux";
import PropTypes from "prop-types";
import Patients from "../components/Patients";
import { logout } from "../redux/actions/authActions";
import {
  Box,
  CssBaseline,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";

// MUI

function PatientsList(props) {
  return (
            <Card>
              <CardContent>
                <Box sx={{ width: "100%" }} pb={2}>
                  <Typography
                    variant="h5"
                    align="left"
                    gutterBottom
                    component="div"
                  >
                    Patients
                  </Typography>
                  <Divider />
                </Box>
                <Grid container spacing={3} fullWidth>                  
                  <Grid item xs={12}>
                    <Patients/>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
  )
}

PatientsList.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps, { logout })(PatientsList);
