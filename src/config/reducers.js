import {combineReducers} from "redux"
import accountReducer from "../pages/account/store/reducer";
import loginReducer from "../pages/login/store/reducer.js";
import pigReducer from "../pages/pig/store/reducer";

export default combineReducers({
    accountReducer,
    loginReducer,

    pigReducer

})
