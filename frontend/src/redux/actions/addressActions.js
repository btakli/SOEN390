import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_ADDRESS, DELETE_ADDRESS, ADD_ADDRESS, ALERT_PATIENTS} from "./types.js";

// GET ADDRESS API CALL
export const getAddresses = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/address/', config)
        .then(res => {
            dispatch({
                type: GET_ADDRESS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE ADDRESS API CALL
export const deleteAddress = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.delete(`http://localhost:8000/api/address/${id}/`, config)
        .then(res => {
            dispatch(createMessage({
                deleteAddress: 'Address Deleted'
            }));
            dispatch({
                type: DELETE_ADDRESS,
                payload: id
            });
        }).catch(err => console.log(err));
}

// POST ADDRESS API CALL
export const addAddress = (address) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/address/', address, config)
        .then(res => {
            dispatch(createMessage({
                addAddress: 'Address Added'
            }));
            dispatch({
                type: ADD_ADDRESS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// GET AT RISK PATIENTS API CALL
export const getAtRiskPatients = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/patients/at-risk/', config)
        .then(res => {
            dispatch({
                type: ALERT_PATIENTS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
