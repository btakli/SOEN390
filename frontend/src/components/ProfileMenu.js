import { React, Fragment, useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import { deepPurple } from '@mui/material/colors';

const menu = ["Profile", "Account", "Dashboard", "Logout"];

function ProfileMenu(){

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  onClick={handleOpenMenu}
                  sx={{ p: 0.5 }}
                >
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      {/* REDUX FOR NAME HERE */}
                      {"G"}
                  </Avatar>
                </IconButton>
            </Tooltip>
            
            <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
            >
                {menu.map((item) => (
                  <MenuItem key={item} onClick={handleCloseMenu}>
                    <Typography textAlign="center">{item}</Typography>
                  </MenuItem>
                ))}
            </Menu>
        </Fragment>
    )
}

export default ProfileMenu;


