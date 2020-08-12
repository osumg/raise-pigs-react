import {combineReducers} from "redux"
import accountReducer from "../pages/account/store/reducer";
import pigReducer from "../pages/pig/pigStore";

export default combineReducers({accountReducer, pigReducer})
