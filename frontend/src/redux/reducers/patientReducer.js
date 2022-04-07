import { GET_PATIENTS, GET_DOCTOR } from "../actions/types.js";

const initialState = {
  patients: [],
  doctor: {},
};

// Note: function has no name so we define ...
// this reducers name in the index file when we import
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };
    case GET_DOCTOR:
      return {
        ...state,
        doctor: action.payload,
      };
    default:
      return state;
  }
}
