import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import StatusForm from "../components/forms/StatusForm";
import StatusTable from "../components/tables/StatusTable";

// MUI
import {
  Card,
  CardContent,
  Typography,
  Divider
} from "@mui/material";
import PersonTable from "../components/tables/PersonTable";

function PatientStatus(props) {
  
  return (    
    <Card>
      <CardContent>
        <Typography
          variant="h5"
          align="left"
          gutterBottom
          component="div"   

        >
          {props.auth.userData.first_name}'s Update Status Form
        </Typography>

        <Divider/>

        {/* <PersonTable /> */}

        <StatusTable />

        <Divider/>

        <StatusForm />

      </CardContent>
    </Card>
  );
}

PatientStatus.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(PatientStatus);
