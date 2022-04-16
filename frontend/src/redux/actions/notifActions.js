import axios from 'axios';
import { createMessage, returnErrors } from './messageActions';
import { tokenConfig } from './authActions';
import { GET_NOTIFS, DELETE_NOTIF, ADD_NOTIF} from "./types.js";

// GET NOTIFS API CALL
export const getNotifications = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/notification/', config)
        .then(res => {
            dispatch({
                type: GET_NOTIFS,
                payload: res.data
            });
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}

// DELETE NOTIF API CALL
export const deleteNotification = (id) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.delete(`http://localhost:8000/api/notification/${id}/`, config)
        .then(res => {
            dispatch({
                type: DELETE_NOTIF,
                payload: id
            });
        }).catch(err => console.log(err));
}

// POST NOTIFICATION API CALL
export const addNotification = (notif) => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/notification/', notif, config)
        .then(res => {
            dispatch(createMessage({
                addNotif: 'Notification Added'
            }));
            axios.get('http://localhost:8000/api/notification/', config)
                .then(res => {
                    dispatch({
                        type: GET_NOTIFS,
                        payload: res.data
                    });
                }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
        }).catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
}
