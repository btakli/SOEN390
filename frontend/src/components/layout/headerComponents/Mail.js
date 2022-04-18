import { React, Fragment, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

import ContactForm from "../../forms/ContactForm";

function Mail() {
  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <ContactForm open={open} onClose={handleDialogClose} />
      <Tooltip title="Mails">
        <IconButton
          size="large"
          aria-label="emails"
          color="inherit"
          onClick={handleDialogOpen}
        >
          <MailIcon />
        </IconButton>
      </Tooltip>
    </Fragment>
  );
}

export default Mail;
