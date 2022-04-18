import { React, Fragment, useState } from "react";
import { connect } from "react-redux";

import { IconButton, Tooltip } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

import DoctorReportForm from "../../forms/DoctorReportForm";
import PatientReportForm from "../../forms/PatientReportForm";
import OfficerReportForm from "../../forms/OfficerReportForm";

const Report = (props) => {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const ReportForm = () => {
    if (props.auth.user.is_patient) {
      return (
        <PatientReportForm
          open={open}
          onClose={handleDialogClose}
          admin_email={props.admin_email}
        />
      );
    } else if (props.auth.user.is_doctor) {
      return (
        <DoctorReportForm
          open={open}
          onClose={handleDialogClose}
          admin_email={props.admin_email}
        />
      );
    } else if (props.auth.user.is_immigration_officer) {
      return (
        <OfficerReportForm
          open={open}
          onClose={handleDialogClose}
          admin_email={props.admin_email}
        />
      );
    } else {
      return null;
    }
  };

  return (
    <Fragment>
      <ReportForm />
      <Tooltip title="File an Issue Report">
        <IconButton
          size="large"
          aria-label="report"
          color="inherit"
          onClick={handleDialogOpen}
        >
          <ReportIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Report);
