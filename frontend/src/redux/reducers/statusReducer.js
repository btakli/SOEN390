import { GET_STATUS, GET_LATEST_STATUS, GET_PATIENT_LATEST_STATUS, ADD_STATUS } from "../actions/types.js";

const initialState = {
    latestStatus: null,
    allStatus: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_LATEST_STATUS:
            return {
                ...state,
                latestStatus: action.payload
            };
        case ADD_STATUS:
            return {
                ...state,
                allStatus: [...state.allStatus, action.payload]
            };
        default:
            return state;
    }
}
