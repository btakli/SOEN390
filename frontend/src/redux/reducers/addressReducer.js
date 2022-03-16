import { GET_ADDRESS, DELETE_ADDRESS, ADD_ADDRESS} from "../actions/types.js";

const initialState = {
    addresses: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_ADDRESS:
            return {
                ...state,
                addresses: action.payload
            };
        case DELETE_ADDRESS:
            return {
                ...state,
                addresses: state.addresses.filter(notif => notif.id !== action.payload)
            };
        case ADD_ADDRESS:
            return {
                ...state,
                addresses: [...state.addresses, action.payload]
            };
        default:
            return state;
    }
}