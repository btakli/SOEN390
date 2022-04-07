import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_AVAILABILITY, DELETE_AVAILABILITY, ADD_AVAILABILITY } from "./types.js";

// GET ADDRESS API CALL
export const getAvailabilities = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/availability/', config)
        .then(res => {
            dispatch({
                type: GET_AVAILABILITY,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE ADDRESS API CALL
export const deleteAvailability = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.delete(`http://localhost:8000/api/availability/${id}/`, config)
        .then(res => {
            dispatch(createMessage({
                deleteAvailability: 'Availability Deleted'
            }));
            dispatch({
                type: DELETE_AVAILABILITY,
                payload: id
            });
        }).catch(err => console.log(err));
}

// POST ADDRESS API CALL
export const addAvailability = (availability) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/availability/', availability, config)
        .then(res => {
            dispatch(createMessage({
                addAvailability: 'Availability Added'
            }));
            dispatch({
                type: ADD_AVAILABILITY,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
