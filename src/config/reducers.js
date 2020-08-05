import {combineReducers} from "redux"
import accountReducer from "../pages/account/accountStore";
import pigReducer from "../pages/pig/pigStore";

export default combineReducers({accountReducer, pigReducer})
