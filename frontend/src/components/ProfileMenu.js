import { React, Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Menu, MenuItem } from "@mui/material";
import { deepOrange, deepPurple } from '@mui/material/colors';

const menu = ["Profile", "Account", "Dashboard", "Logout"];

function ProfileMenu(props){

    const [anchorEl, setAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    let color = (props.auth.user.is_patient) ? deepPurple[500] : deepOrange[500] ;

    return (
        <Fragment>
            <Tooltip title="Account">
                <IconButton
                  color="inherit"
                  onClick={handleOpenMenu}
                  sx={{ p: 0.5 }}
                >
                  <Avatar sx={{ bgcolor: color }}>
                      {props.auth.userData.first_name.charAt(0)}
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

ProfileMenu.propTypes = {
    auth: PropTypes.object.isRequired,
  };
  
const mapStateToProps = (state) => ({
    auth: state.authReducer,
});

export default connect(mapStateToProps)(ProfileMenu);


