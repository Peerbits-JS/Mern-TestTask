import { combineReducers } from "redux";
import userDataReducer from "./userDataReducer";

// Combine all reducers as root reducer
export default combineReducers({
  userDataReducer
});
