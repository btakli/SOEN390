import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EmergencyForm from "../../forms/EmergencyForm";

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

        <EmergencyForm open={open} onClose={handleDialogClose}/>

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
