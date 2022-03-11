import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_ALL_STATUS, GET_LATEST_STATUS, GET_PATIENT_LATEST_STATUS, ADD_STATUS } from './types';

// // GET STATUS API CALL
export const getAllStatus = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/patient/status/', config)
        .then(res => {
            dispatch({
                type: GET_ALL_STATUS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// Might not be needed anymore...
// GET LATEST STATUS API CALL
export const getLatestStatus = () => (dispatch, getState) => {
    const config = tokenConfig(getState);

    axios.get(`http://localhost:8000/api/patient/status/latest/`, config)
        .then(res => {
            dispatch({
                type: GET_LATEST_STATUS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// POST STATUS API CALL
export const addStatus = (status) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/patient/status/', status, config)
        .then(res => {
            dispatch(createMessage({
                addStatus: 'Status Updated'
            }));
            dispatch({
                type: ADD_STATUS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
