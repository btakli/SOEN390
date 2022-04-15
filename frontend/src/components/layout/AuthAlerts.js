import { useEffect, useRef, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeMessages, removeErrors } from "../../redux/actions/messageActions";

function AuthAlerts(props) {

    const updateRef = useRef(true);

    useEffect(() => {

        // Avoid initial mount with this if stment
        if (updateRef.current){
            // actual update code

            // Custom msgs per error returned
            if (props.error.msg.non_field_errors) {
                props.alert.error(props.error.msg.non_field_errors.join());
            }
            if (props.error.msg.user) {
                if (props.error.msg.user.email) {
                    props.alert.error(props.error.msg.user.email.join());
                }
            }
            // Check if there is even an error to flag
            // if (props.error.status) props.alert.error("ERROR FOUND");
            props.removeErrors();
        }

    }, [props.error]);

    useEffect(() => {

        // Avoid initial mount with this if stment
        if (updateRef.current){
            // actual update code
            // Check if the payloads are there
            if (props.message.passwordsDoNotMatch) props.alert.error(props.message.passwordsDoNotMatch);

            props.removeMessages();
        }

    }, [props.message]);


    return (
        <Fragment />
    );
}

AuthAlerts.propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

const mapStateToProps = state => ({
    error: state.errorReducer,
    message: state.messageReducer
});

export default connect(mapStateToProps, { removeMessages, removeErrors })(withAlert()(AuthAlerts));
