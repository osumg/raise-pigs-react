import actionType from "./actionType";

const defaultState = {
    dataSource: [],
    account: '',
    spin: false,

    visible: false,
    // modal中的数据
    modalAccount: '',
    accountTip: '',
    pwd: '',
    pwdTip: '',
    rePwd: '',
    rePwdTip: '',
    accountType: '',
    description: ''
}


export default function accountReducer(state = defaultState, action) {
    switch (action.type) {
        case actionType.INIT:
            return {...state, spin: action.spin, dataSource: action.dataSource};
        case actionType.SET_ACCOUNT:
            return {...state, account: action.account};
        case actionType.ADD_CHECK:
            return {...state, accountTip: action.accountType, pwdTip: action.pwdTip, rePwdTip: action.rePwdTip}
        case actionType.SET_DESCRIPTION:
            return {...state, description: action.description}
        case actionType.SET_RE_PWD:
            return {...state, rePwd: action.rePwd, rePwdTip: action.rePwdTip};
        case actionType.SET_PWD:
            return {...state, pwd: action.pwd, pwdTip: action.pwdTip};
        case actionType.SET_ACCOUNT_TYPE:
            return {...state, accountType: action.accountType};
        case actionType.SET_MODAL_ACCOUNT:
            return {...state, modalAccount: action.modalAccount, accountTip: action.accountTip};
        case actionType.SET_VISIBLE:
            return {...state, visible: action.visible};
        case actionType.SPIN:
            return {...state, spin: action.spin};
        case actionType.ADD:
            return {...state, spin: action.spin, visible: action.visible}


        default:
            return {...state};
    }
}
