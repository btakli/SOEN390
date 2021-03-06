import axios from 'axios';
import { returnErrors } from './messageActions';
import { USER_LOADED, USER_DATA_LOADED, USER_LOADING, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

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
            const userRole = res.data;
            let userType = (userRole.is_doctor) ? "doctor" : ((userRole.is_patient) ? "patient" : ((userRole.is_immigration_officer) ? "immigration-officer" : null));

            axios.get(`http://localhost:8000/api/auth/users/${userType}`, config)
                .then(res => {
                    dispatch({
                        type: USER_DATA_LOADED,
                        payload: res.data
                    });
                }).catch(err => {
                    dispatch(returnErrors(err.response.data, err.response.status));
                    dispatch({
                        type: AUTH_ERROR
                    })
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

// REGISTER IMMIGRANT
export const registerImmigrant = ({
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

    axios.post('http://localhost:8000/api/auth/register/immigrant', body, config)
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

// REGISTER IMMIGRATION OFFICER
export const registerImmigrationOfficer = ({
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

    axios.post('http://localhost:8000/api/auth/register/immigration-officer', body, config)
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

// LOGIN IMMIGRATION OFFICER
export const loginImmigrationOfficer = (email, password) => dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    }

    const body = JSON.stringify({email, password});

    axios.post('http://localhost:8000/api/auth/login/immigration-officer', body, config)
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

export const toggleIsAway = () => (dispatch, getState) => {

    const config = tokenConfig(getState);

    axios.put('http://localhost:8000/api/toggle/is-away/', null, config)
        .then(res => {
            dispatch({ type: USER_LOADING });

            axios.get('http://localhost:8000/api/auth/user', config)
                .then(res => {
                    dispatch({
                        type: USER_LOADED,
                        payload: res.data
                    });
                    const userRole = res.data;
                    let userType = (userRole.is_doctor) ? "doctor" : ((userRole.is_patient) ? "patient" : null);

                    axios.get(`http://localhost:8000/api/auth/users/${userType}`, config)
                        .then(res => {
                            dispatch({
                                type: USER_DATA_LOADED,
                                payload: res.data
                            });
                        }).catch(err => {
                            dispatch(returnErrors(err.response.data, err.response.status));
                            dispatch({
                                type: AUTH_ERROR
                            })
                        });
                }).catch(err => {
                    dispatch(returnErrors(err.response.data, err.response.status));
                    dispatch({
                        type: AUTH_ERROR
                    })
                });    
        }).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
        });
}
