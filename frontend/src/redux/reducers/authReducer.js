import { USER_LOADING, USER_LOADED, USER_DATA_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: true,
    user: null,
    userData: null
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: true,
                user: action.payload
            };
        case USER_DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                userData: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
                userData: action.payload.user_data
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                userData: null
            };
        default:
            return state;
    }
}
