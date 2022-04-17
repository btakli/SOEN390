import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmergencyAbsenceForm from "../../forms/EmergencyAbsenceForm";

// MUI
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

function EmergencyLeave(props) {

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
      setOpen(true);
  };

  const handleDialogClose = () => {
      setOpen(false);
  };

  if (props.auth.user.is_doctor && !props.auth.userData.is_away) {
    return (
      <Fragment>

        <EmergencyAbsenceForm open={open} onClose={handleDialogClose} admin_email={props.admin_email}/>

        <Tooltip title="Emergency">

        <Button
          variant="contained"
          onClick={handleDialogOpen}
          style={{ backgroundColor: "#DC143C" }}
        >
            Emergency Leave
          </Button>

        </Tooltip>
        
      </Fragment>
    );
  } else {
    return null;
  }
}

EmergencyLeave.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(EmergencyLeave);
