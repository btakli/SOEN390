import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_PERSONS, DELETE_PERSON, ADD_PERSON } from './types';

// GET PERSONS API CALL
export const getPersons = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/person/', config)
        .then(res => {
            dispatch({
                type: GET_PERSONS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE PERSON API CALL
export const deletePerson = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.delete(`http://localhost:8000/api/person/${id}/`, config)
        .then(res => {
            dispatch(createMessage({
                deletePerson: 'Person Deleted'
            }));
            dispatch({
                type: DELETE_PERSON,
                payload: id
            });
        }).catch(err => console.log(err));
}

// POST PERSON API CALL
export const addPerson = (person) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/person/', person, config)
        .then(res => {
            dispatch(createMessage({
                addPerson: 'Person Added'
            }));
            dispatch({
                type: ADD_PERSON,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
