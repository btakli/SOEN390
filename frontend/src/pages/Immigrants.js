import { connect } from "react-redux";
import PropTypes from "prop-types";
import ImmigrantTable from "../components/tables/ImmigrantTable";

// MUI
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";


function Immigrants(props) {
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
            Immigrants
          </Typography>
          <Divider />
        </Box>
        <Grid container spacing={3} fullwidth="true">                  
          <Grid item xs={12}>
            <ImmigrantTable />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

Immigrants.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Immigrants);
