import { connect } from "react-redux";
import PropTypes from "prop-types";
import PatientTable from "../components/tables/PatientTable";

// MUI
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";


function Patients(props) {
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
        <Grid container spacing={3} fullwidth="true">                  
          <Grid item xs={12}>
            <PatientTable />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Patients.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Patients);
