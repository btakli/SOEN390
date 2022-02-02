import { combineReducers } from "redux";
import personReducer from "./personReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer"

// Overwrite this redux element
export default combineReducers({
    personReducer,
    errorReducer,
    messageReducer
});