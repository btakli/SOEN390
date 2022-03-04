import { React, Fragment, useState } from "react";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";

import ContactForm from "./forms/ContactForm";


function Mail(){
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
                    <Badge color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
                <IconButton color="inherit">
                    <NotificationsIcon />
                </IconButton>
            </Tooltip>


        </Fragment>
        
    )
}

export default Mail;


