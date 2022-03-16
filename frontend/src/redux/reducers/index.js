import { combineReducers } from "redux";
import personReducer from "./personReducer";
import patientReducer from "./patientReducer";
import errorReducer from "./errorReducer";
import messageReducer from "./messageReducer";
import authReducer from "./authReducer";
import statusReducer from "./statusReducer";
import notifReducer from "./notifReducer";

// Overwrite this redux element
export default combineReducers({
    personReducer,
    patientReducer,
    errorReducer,
    messageReducer,
    authReducer,
    statusReducer,
    notifReducer
});
