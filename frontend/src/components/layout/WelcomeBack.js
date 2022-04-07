import { connect } from "react-redux";
import PropTypes from "prop-types";
import { toggleIsAway } from '../../redux/actions/authActions';
import Image from '../../media/thinking_emoji.jpg';

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

  const resetPatients = (e) => {
    e.preventDefault();    
    props.toggleIsAway();
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ width: "100%" }} pb={4}>
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            component="div"
          >
            Welcome Back Dr. {props.auth.userData.last_name}!
            <br/>
            <h6>
            If you are ready to return to work and get your patients back,
            please click on the button below.
            </h6>
          </Typography>     
          <Box
          component="img"
          pb={3}
          sx={{
            maxHeight: { xs: 167, md: 233 },
            maxWidth: { xs: 250, md: 350 },
            }}
            src={Image}/>     
          <Divider />
        </Box>
        <Grid container spacing={3} fullwidth="true" mb={3}>    
          <Grid item xs={12}>
          <Button
                type="submit"
                size="large"
                fullWidth={true}
                onClick={resetPatients}
                variant="contained"
                style={{ backgroundColor: "#32CD32" }}
              >
                I am ready
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

export default connect(mapStateToProps, {toggleIsAway})(WelcomeBack);
