import actionType from "./actionType";
import {fetchGet, fetchPost} from "../../../utils/fetchUtils";

const showSpin = fun => {
    fun({
        type: actionType.SPIN,
        spin: true
    })
}

const init = () => {
    return dispatch => {
        showSpin(dispatch);
        fetchGet('service/account/find-all', res => {
            dispatch({
                type: actionType.INIT,
                dataSource: res,
                spin: false
            })
        })
    }
}

const setAccount = e => {
    return {
        type: actionType.SET_ACCOUNT,
        account: e.target.value
    }
}

const search = account => {
    return dispatch => {
        showSpin(dispatch);
        fetchPost('/service/account/find-by', {
            account
        }, res => {
            dispatch({
                type: actionType.INIT,
                dataSource: res,
                spin: false
            })
        })
    }
}

const setVisible = visible => {
    return {
        type: actionType.SET_VISIBLE,
        visible
    }
}

const setModalAccount = (e) => {
    let modalAccount = e.target.value;
    if (/[A-Za-z0-9]{4,16}/.test(modalAccount)) {
        return {
            type: actionType.SET_MODAL_ACCOUNT,
            modalAccount,
            accountTip: ''
        }
    }
    return {
        type: actionType.SET_MODAL_ACCOUNT,
        modalAccount,
        accountTip: '账号由4-16位数字或大小写字母组成'
    };
}

const setAccountType = (e) => {
    let accountType = e.target.value;
    return {
        type: actionType.SET_ACCOUNT_TYPE,
        accountType
    };
}

const setPwd = (e) => {
    let pwd = e.target.value.trim();
    if (/[a-zA-Z0-9]{6,16}/.test(pwd)) {
        return {
            type: actionType.SET_PWD,
            pwd,
            pwdTip: ''
        }
    }

    return {
        type: actionType.SET_PWD,
        pwd,
        pwdTip: '密码由6-16位数字或大小写字母组成'
    };
}

const setRePwd = (e, pwd) => {
    let rePwd = e.target.value.trim();
    if (rePwd === pwd) {
        return {
            type: actionType.SET_RE_PWD,
            rePwd,
            rePwdTip: ''
        }
    }

    return {
        type: actionType.SET_RE_PWD,
        rePwd,
        rePwdTip: '两次密码输入不一致'
    }
}
const setDescription = (e) => {
    let description = e.target.value;
    return {
        type: actionType.SET_DESCRIPTION,
        description
    }
}

const addAccount = (storeState) => {
    const {
        modalAccount,
        accountType,
        accountTip,
        pwd,
        pwdTip,
        rePwd,
        rePwdTip,
    } = storeState;

    console.log(storeState)

    if (!modalAccount || accountTip) {
        return {
            type: actionType.ADD_CHECK,
            accountTip: accountTip || '用户账号不能为空'
        }
    }

    if (!pwd || pwdTip) {
        return {
            type: actionType.ADD_CHECK,
            pwdTip: pwdTip || '用户密码不能为空'
        }
    }

    if (!rePwd || rePwdTip) {
        return {
            type: actionType.ADD_CHECK,
            rePwdTip: rePwdTip || '请确认密码'
        }
    }

    if (pwd !== rePwd) {
        return {
            type: actionType.ADD_CHECK,
            rePwdTip: '两次输入密码不一致'
        }
    }

    return dispatch => {
        showSpin(dispatch);
        fetchPost('/service/account/add', {
            account: modalAccount,
            type: accountType,
            password: pwd,
            createBy: '1'
        }, res => {
            dispatch({
                type: actionType.ADD,
                visible: false,
                spin: false
            })
        })
    }
}

export default {
    init,
    setAccount,
    search,
    setVisible,
    setModalAccount,
    setAccountType,
    setPwd,
    setRePwd,
    setDescription,
    addAccount
}
