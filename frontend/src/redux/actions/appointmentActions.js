import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_APPOINTMENT, DELETE_APPOINTMENT, ADD_APPOINTMENT } from "./types.js";

// GET ADDRESS API CALL
export const getAppointments = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/appointment/', config)
        .then(res => {
            dispatch({
                type: GET_APPOINTMENT,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE ADDRESS API CALL
export const deleteAppointment = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.delete(`http://localhost:8000/api/appointment/${id}/`, config)
        .then(res => {
            dispatch(createMessage({
                deleteAppointment: 'Appointment Deleted'
            }));
            dispatch({
                type: DELETE_APPOINTMENT,
                payload: id
            });
        }).catch(err => console.log(err));
}

// POST ADDRESS API CALL
export const addAppointment = (appointment) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/appointment/', appointment, config)
        .then(res => {
            dispatch(createMessage({
                addAppointment: 'Appointment Added'
            }));
            dispatch({
                type: ADD_APPOINTMENT,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
