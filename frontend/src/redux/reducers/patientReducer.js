import { GET_PATIENTS, GET_IMMIGRANTS } from "../actions/types.js";

const initialState = {
    patients: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_PATIENTS:
            return {
                ...state,
                patients: action.payload
            };
        case GET_IMMIGRANTS:
            return {
                ...state,
                patients: action.payload
            };
        default:
            return state;
    }
}