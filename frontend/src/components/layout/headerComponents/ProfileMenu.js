import { React, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// MUI
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { deepOrange, deepPurple } from '@mui/material/colors';

function ProfileMenu(props){

    let navigate = useNavigate();

    const home = props.home === "/" ? "" : props.home;

    const handleClick = () => {
        navigate(`${home}/profile`);
    };

    let color = (props.auth.user.is_patient) ? deepPurple[500] : deepOrange[500] ;

    return (
        <Fragment>
            <Tooltip title="Account">
                <IconButton
                color="inherit"
                onClick={handleClick}
                sx={{ p: 0.5 }}
                >
                <Avatar sx={{ bgcolor: color }}>
                    {props.auth.userData.first_name.charAt(0)}
                </Avatar>
                </IconButton>
            </Tooltip>
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


