import actionType from "./actionType";
import {fetchDelete, fetchGet, fetchPost, fetchPut} from "../../../utils/fetchUtils";

const showSpin = fun => {
    fun({
        type: actionType.SPIN,
        spin: true
    })
}

// 获取用户数据列表
const getListData = (dispatch, current, size) => {
    showSpin(dispatch);
    fetchGet(`/service/sys-user/find-user?current=${current}&size=${size}`, res => {
        dispatch({
            type: actionType.INIT,
            dataSource: res.records,
            total: res.total,
            current: current,
            size: size,
            spin: false,
        })
    })
}

// 初始化
const init = (current, size) => {
    return dispatch => {
        getListData(dispatch, current, size)
    };
}

// 设置账号 搜索用
const setAccount = e => {
    return {
        type: actionType.SET_ACCOUNT,
        account: e.target.value
    }
}

// 设置用户名，modal内
const setUsername = e => {
    let username = e.target.value.trim();
    return {
        type: actionType.SET_USERNAME,
        username,
        usernameTip: ''
    }
}

const setUsername1 = e => {
    let username1 = e.target.value.trim();
    return {
        type: actionType.SET_USERNAME_1,
        username1,
        usernameTip1: ''
    }
}


const search = (storeState) => {
    const {account, current, size} = storeState;
    return dispatch => {
        showSpin(dispatch);
        fetchPost('/service/sys-user/find-by', {account, current, size}, res => {
            dispatch({
                type: actionType.INIT,
                dataSource: res.records,
                total: res.total,
                current: current,
                size: size,
                spin: false,
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

const setVisible1 = (visible1, id) => {
    return {
        type: actionType.SET_VISIBLE_1,
        visible1,
        updateId: id
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

// 发送添加账号的请求
const addAccountFetch = (dispatch, storeState) => {
    const {
        modalAccount,
        pwd,
        username,
        current,
        size
    } = storeState;

    dispatch({
        type: actionType.ADD_BEFORE,
        loading: true
    })
    fetchPost('/service/sys-user/add', {
        account: modalAccount,
        username: username,
        password: pwd,
    }, res => {
        dispatch({
            type: actionType.ADD_AFTER,
            loading: false,
            visible: false
        });
        getListData(dispatch, current, size);
    })
}

const addAccount = (storeState) => {
    const {
        modalAccount,
        accountTip,
        pwd,
        pwdTip,
        rePwd,
        rePwdTip,
        username,
        usernameTip,
    } = storeState;

    if (!modalAccount || accountTip) {
        return {
            type: actionType.ADD_CHECK,
            accountTip: accountTip || '用户账号不能为空'
        }
    }
    if (!username || usernameTip) {
        return {
            type: actionType.ADD_CHECK,
            accountTip: usernameTip || '用户名不能为空'
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
        // 验证账号是否存在
        fetchGet(`/service/sys-user/find/${modalAccount}`, res => {
            if (!res.hasOne) {
                addAccountFetch(dispatch, storeState);
            } else {
                dispatch({
                    type: actionType.SET_MODAL_ACCOUNT,
                    modalAccount,
                    accountTip: '账号已经存在'
                })
            }
        })
    }
}

const modifyAccount = (storeState) => {
    const {
        updateId,
        username1,
        usernameTip1,
        current,
        size
    } = storeState;

    if (!username1 || usernameTip1) {
        return {
            type: actionType.ADD_CHECK,
            accountTip: usernameTip1 || '用户名不能为空'
        }
    }

    console.log('updateId', updateId)



    return dispatch => {
        dispatch({
            type: actionType.MODIFY_BEFORE,
            loading1: true
        })
        fetchPut('/service/sys-user/modify', {
            id: updateId,
            username: username1,
        }, res => {
            dispatch({
                type: actionType.MODIFY_AFTER,
                loading1: false,
                visible1: false
            });

            getListData(dispatch, current, size);
        })
    }
}

const onShowSizeChange = (current, pageSize) => {
    return dispatch => {
        getListData(dispatch, current, pageSize);
    }
}

const onPaginationChange = (page, pageSize) => {
    return (dispatch, getState) => {
        getListData(dispatch, page, pageSize);
    }
}

const deleteById = (id, storeState) => {
    // const offset = getState().main.listOffset;
    //         const ListItemData = getState().main.ListItemData;
    const {current, size} = storeState;
    return dispatch => {
        fetchDelete(`/service/sys-user/delete/${id}`, res => {
            getListData(dispatch, current, size);
        })
    }
}

export default {
    init,
    setAccount,
    search,
    setVisible,
    setModalAccount,
    setPwd,
    setRePwd,
    addAccount,
    setUsername,
    onShowSizeChange,
    onPaginationChange,
    modifyAccount,
    setVisible1,
    setUsername1,
    deleteById
}
