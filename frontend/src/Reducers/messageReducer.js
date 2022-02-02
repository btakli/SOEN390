import { GET_MESSAGES, CREATE_MESSAGE } from "../actions/types";

const initialState = {};

export default function(state=initialState, action){
    switch (action.type){
        case CREATE_MESSAGE:
            // weird js stuff (assign then return)
            return (state = action.payload);
        default:
            return state;
    }

}
