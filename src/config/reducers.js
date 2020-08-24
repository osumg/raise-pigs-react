import {combineReducers} from "redux"
import accountReducer from "../pages/account/store/reducer";
import loginReducer from "../pages/main/login/store/reducer.js";
import pigReducer from "../pages/pig/pigStore";

export default combineReducers({accountReducer, pigReducer, loginReducer})
