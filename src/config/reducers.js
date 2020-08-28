import {combineReducers} from "redux"
import accountReducer from "../pages/account/store/reducer";
import loginReducer from "../pages/login/store/reducer.js";

export default combineReducers({accountReducer, loginReducer})
