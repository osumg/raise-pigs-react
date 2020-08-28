import actionType from "./actionType";
import {fetchFormPost, fetchPost} from "../../../utils/fetchUtils";

const setUsername = e => {
    return {
        type: actionType.SET_USERNAME,
        username: e.target.value.trim()
    }
}

const setPassword = e => {
    return {
        type: actionType.SET_PASSWORD,
        password: e.target.value.trim()
    }
}

// 改变页面，登录|注册
const changeLoginType = isLogin => {
    return {
        type: actionType.IS_LOGIN,
        isLogin: isLogin
    }
}

const login = (storeState,that) => {
    console.log(storeState.password);
    return dispatch => {
        fetchFormPost('/login',
            'username=' + storeState.username +
            '&password=' + storeState.password, res => {
                localStorage.setItem("token", res.token);
                localStorage.setItem("userInfo", res.userInfo);
            })
    }

}


export default {
    setUsername,
    setPassword,
    changeLoginType,
    login
}
