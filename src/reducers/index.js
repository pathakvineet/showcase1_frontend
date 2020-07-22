import { combineReducers } from "redux";
import authReducer from "./authReducer";
import taskReducer from './taskReducer';
import photoReducer from './photoReducer';
import extrasReducer from "./extrasReducer";
import { LOGOUT } from "../actions/actionTypes";


// Combine all reducers.
const appReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
  photos: photoReducer,
  extras: extrasReducer
});


const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;