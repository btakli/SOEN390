import { GET_PERSONS, DELETE_PERSON } from "../actions/types.js";

const initialState = {
    persons: []
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function(state=initialState, action){
    switch (action.type){
        case GET_PERSONS:
            return {
                ...state,
                persons: action.payload
            };
        case DELETE_PERSON:
            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.payload)
            };
        default:
            return state;
    }
}