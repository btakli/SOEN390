import axios from 'axios';
import { returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_IMMIGRANTS, UPDATE_IMMIGRANT_PRIORITY } from './types';

// GET PERSONS API CALL
export const getImmigrants = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/immigrants/', config)
        .then(res => {
            dispatch({
                type: GET_IMMIGRANTS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}


// UPDATE IMMIGRANT PRIORITY API CALL
export const toggleImmigrantPriority = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.put(`http://localhost:8000/api/toggle/priority/${id}/`, null, config)
        .then(res => {
            axios.get('http://localhost:8000/api/immigrants/', config)
            .then(res => {
                dispatch({
                    type: GET_IMMIGRANTS,
                    payload: res.data
                });
            }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
        }).catch(err => {console.log(err); dispatch(returnErrors(err.response.data, err.response.status))});
}
