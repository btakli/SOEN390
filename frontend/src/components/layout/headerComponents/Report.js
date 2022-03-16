import { React, Fragment, useState } from "react";
import { connect } from "react-redux";

import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Badge } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

import DoctorReportForm from "../../forms/reports/DoctorReportForm";
import PatientReportForm from "../../forms/reports/PatientReportForm";

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
        <PatientReportForm open={open} onClose={handleDialogClose} />
      );
    } else if (props.auth.user.is_doctor) {
      return (
        <DoctorReportForm open={open} onClose={handleDialogClose} />
      );
    } else {
      return (null);  // Is this implicit?
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
          <Badge color="error">
            <ReportIcon />
          </Badge>
        </IconButton>
      </Tooltip>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(Report);
