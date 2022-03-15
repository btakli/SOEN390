import { GET_NOTIFS, DELETE_NOTIF, ADD_NOTIF} from "../actions/types.js";

const initialState = {
    notifications: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_NOTIFS:
            return {
                ...state,
                notifications: action.payload
            };
        case DELETE_NOTIF:
            return {
                ...state,
                notifications: state.notifications.filter(notif => notif.id !== action.payload)
            };
        case ADD_NOTIF:
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            };
        default:
            return state;
    }
}