import axios from 'axios';
import { returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_PATIENTS } from './types';

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