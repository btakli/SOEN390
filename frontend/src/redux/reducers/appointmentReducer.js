import { GET_APPOINTMENT, DELETE_APPOINTMENT, ADD_APPOINTMENT } from "../actions/types.js";

const initialState = {
    appointments: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_APPOINTMENT:
            return {
                ...state,
                appointments: action.payload
            };
        case DELETE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter(notif => notif.id !== action.payload)
            };
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointments: [...state.appointments, action.payload]
            };
        default:
            return state;
    }
}