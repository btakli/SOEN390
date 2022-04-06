import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Button
} from "@mui/material";


function WelcomeBack(props) {
  

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
            Welcome Back
          </Typography>
          <Divider />
        </Box>
        <Grid container spacing={3} fullwidth="true">                  
          <Grid item xs={12}>
          <Button
                variant="contained"
                style={{ backgroundColor: "#00bcd4" }}
              >
                Notify Admin
              </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

WelcomeBack.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(WelcomeBack);
