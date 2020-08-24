import actionType from "./actionType";

const defaultState = {
    username: '',
    password: '',
    isLogin: true,
    userInfo: {}
}


export default function accountReducer(state = defaultState, action) {
    switch (action.type) {
        case actionType.SET_USERNAME:
            return {...state, username: action.username};
        case actionType.SET_PASSWORD:
            return {...state, password: action.password};
        case actionType.IS_LOGIN:
            return {...state, isLogin: action.isLogin};
        case actionType.LOGIN:
            return {...state, userInfo: action.userInfo};
        default:
            return {...state};
    }
}
