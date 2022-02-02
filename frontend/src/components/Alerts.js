import { useEffect, useRef, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function Alerts(props) {

    const mountRef = useRef(false);
    const updateRef = useRef(false);

    useEffect(() => {
        // Avoid initial mount with this if stment
        if (!mountRef.current){
            updateRef.current = true;
        }
    }, []);

    useEffect(() => {

        // Avoid initial mount with this if stment
        if (updateRef.current){
            // actual update code

            // Custom msgs per error returned
            // if (props.error.msg.name) {
            //     props.alert.error(`Name: ${error.msg.name.join()}`);
            // }
            // Check if there is even an error to flag
            if (props.error.status) props.alert.error("ERROR FOUND");
        }

    }, [props.error]);

    useEffect(() => {

        // Avoid initial mount with this if stment
        if (updateRef.current){
            // actual update code

            // Check if the payloads are there
            if (props.message.deletePerson) props.alert.success(props.message.deletePerson);
            if (props.message.addPerson) props.alert.success(props.message.addPerson);
        }

    }, [props.message]);


    return (
        <Fragment/>
    );
}

Alerts.propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  }

const mapStateToProps = state => ({
    error: state.errorReducer,
    message: state.messageReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));