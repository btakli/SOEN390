import axios from 'axios';
import { returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_PATIENTS, UPDATE_PATIENT_PRIORITY } from './types';

// GET PERSONS API CALL
export const getPatients = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/patients/', config)
        .then(res => {
            dispatch({
                type: GET_PATIENTS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


// UPDATE PATIENT PRIORITY API CALL
export const togglePriority = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.put(`http://localhost:8000/api/toggle/priority/${id}/`, null, config)
        .then(res => {
            axios.get('http://localhost:8000/api/patients/', config)
            .then(res => {
                dispatch({
                    type: GET_PATIENTS,
                    payload: res.data
                });
            }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
        }).catch(err => {console.log(err); dispatch(returnErrors(err.response.data, err.response.status))});
}
