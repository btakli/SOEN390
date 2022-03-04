import axios from 'axios';
import { returnErrors } from './messageActions';
import { USER_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

// HELPER FUNCTION FOR API TOKEN SETUP
export const tokenConfig = (getState) => {
    // GET TOKEN FROM THE STATE
    const token = getState().authReducer.token;

    // SET UP HEADERS
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    // CHECK IF TOKEN EXISTS FOR AUTHORIZATION
    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    const config = tokenConfig(getState);

    axios.get('http://localhost:8000/api/auth/user', config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: AUTH_ERROR
            })
        });
}

// REGISTER DOCTOR
export const registerDoctor = ({
    email,
    password,
    ...data }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ 
        "user": { email, password },
        ...data
    });

    axios.post('http://localhost:8000/api/auth/register/doctor', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// REGISTER PATIENT
export const registerPatient = ({
    email,
    password,
    ...data }) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({ 
        "user": { email, password },
        ...data
    });

    axios.post('http://localhost:8000/api/auth/register/patient', body, config)
        .then(res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: REGISTER_FAIL
            })
        });
}

// LOGIN DOCTOR
export const loginDoctor = (email, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('http://localhost:8000/api/auth/login/doctor', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// LOGIN PATIENT
export const loginPatient = (email, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('http://localhost:8000/api/auth/login/patient', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: LOGIN_FAIL
            })
        });
}

// LOGOUT USER
export const logout = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.post('http://localhost:8000/api/auth/logout', null, config)
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}
