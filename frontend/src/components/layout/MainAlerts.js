import { useEffect, useRef, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeMessages, removeErrors } from "../../redux/actions/messageActions";

function MainAlerts(props) {

    const updateRef = useRef(true);

    useEffect(() => {

        // Avoid initial mount with this if stment
        if (updateRef.current){
            // actual update code

            // Custom msgs per error returned
            if (props.error.msg.name) {
                props.alert.error(`Name: ${props.error.msg.name.join()}`);
            }
            if (props.error.msg.email) {
                props.alert.error(`Email: ${props.error.msg.email.join()}`);
            }
            if (props.error.msg.detail && props.error.status != 401) {
                props.alert.error(props.error.msg.detail);
            }
            if (props.error.msg.username) {
                props.alert.error(props.error.msg.username);
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
            if (props.message.deletePerson) props.alert.success(props.message.deletePerson);
            if (props.message.addPerson) props.alert.success(props.message.addPerson);
            if (props.message.passwordsDoNotMatch) props.alert.error(props.message.passwordsDoNotMatch);
            if (props.message.addStatus) props.alert.success(props.message.addStatus);
            if (props.message.testMessage) props.alert.success(props.message.testMessage);
            if (props.message.emailSent) props.alert.success(props.message.emailSent);
            if (props.message.emailSent) props.alert.success(props.message.emailSent);
            if (props.message.deleteNotif) props.alert.success(props.message.deleteNotif);
            if (props.message.saveAvails) props.alert.success(props.message.saveAvails);

            props.removeMessages();
        }

    }, [props.message]);

    return (
        <Fragment />
    );
}

MainAlerts.propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

const mapStateToProps = state => ({
    error: state.errorReducer,
    message: state.messageReducer
});

export default connect(mapStateToProps, { removeMessages, removeErrors })(withAlert()(MainAlerts));
