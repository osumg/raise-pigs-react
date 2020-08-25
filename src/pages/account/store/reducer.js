import actionType from "./actionType";

const defaultState = {
    dataSource: [],
    account: '',
    spin: false,

    visible: false,
    current: 1,
    size: 10,
    total: 100,

    // modal中的数据
    modalAccount: '',
    accountTip: '',
    pwd: '',
    pwdTip: '',
    rePwd: '',
    rePwdTip: '',
    username: '',
    usernameTip: '',
    loading: false,
}


export default function accountReducer(state = defaultState, action) {
    switch (action.type) {
        case actionType.INIT:
            return {
                ...defaultState,
                spin: action.spin,
                dataSource: action.dataSource,
                visible: action.visible,
                total: action.total,
                current: action.current,
                size: action.size
            };
        case actionType.SET_ACCOUNT:
            return {...state, account: action.account};
        case actionType.ADD_CHECK:
            return {
                ...state,
                accountTip: action.accountTip,
                pwdTip: action.pwdTip,
                rePwdTip: action.rePwdTip,
                usernameTip: action.usernameTip
            }
        case actionType.SET_RE_PWD:
            return {...state, rePwd: action.rePwd, rePwdTip: action.rePwdTip};
        case actionType.SET_PWD:
            return {...state, pwd: action.pwd, pwdTip: action.pwdTip};
        case actionType.SET_MODAL_ACCOUNT:
            return {...state, modalAccount: action.modalAccount, accountTip: action.accountTip};
        case actionType.SET_VISIBLE:
            return {...state, visible: action.visible};
        case actionType.SPIN:
            return {...state, spin: action.spin};
        case actionType.ADD:
            return {...state, spin: action.spin, visible: action.visible}
        case actionType.SET_USERNAME:
            return {...state, username: action.username}
        case actionType.ADD_BEFORE:
            return {...state, loading: action.loading}
        case actionType.ADD_AFTER:
            return {...state, loading: action.loading, visible: action.visible}

        default:
            return {...state};
    }
}
