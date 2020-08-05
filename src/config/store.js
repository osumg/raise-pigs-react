import {applyMiddleware, compose, createStore} from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    reduxDevtools
))
export default store;
