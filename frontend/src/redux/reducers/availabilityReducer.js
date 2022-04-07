import {  GET_AVAILABILITY, DELETE_AVAILABILITY, ADD_AVAILABILITY } from "../actions/types.js";

const initialState = {
    availabilities: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_AVAILABILITY:
            return {
                ...state,
                availabilities: action.payload
            };
        case DELETE_AVAILABILITY:
            return {
                ...state,
                availabilities: state.availabilities.filter(notif => notif.id !== action.payload)
            };
        case ADD_AVAILABILITY:
            return {
                ...state,
                availabilities: [...state.availabilities, action.payload]
            };
        default:
            return state;
    }
}