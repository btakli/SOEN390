import { React, Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Badge } from "@mui/material";
import ReportIcon from "@mui/icons-material/Report";

import ReportForm from "../../forms/ReportForm";

function Report() {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ReportForm open={open} onClose={handleDialogClose} />
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
}

export default Report;
