import axios from 'axios';
import { GET_PERSONS, DELETE_PERSON } from './types';

// GET PERSONS API CALL
export const getPersons = () => dispatch => {
    axios.get('http://localhost:8000/api/person/')
        .then(res => {
            dispatch({
                type: GET_PERSONS,
                payload: res.data
            });
        }).catch(err => console.log(err));
}

// DELETE PERSONS API CALL
export const deletePerson = (id) => dispatch => {
    axios.delete(`http://localhost:8000/api/person/${id}/`)
        .then(res => {
            dispatch({
                type: DELETE_PERSON,
                payload: id
            });
        }).catch(err => console.log(err));
}