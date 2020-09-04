import actionType from "./actionType";

const defaultState = {
    dataSource: [],
    account: '',
    spin: false,

    current: 1,
    size: 10,
    total: 100,

    // modal 数据
    visible: false,
    loading: false,

    // modify modal 数据
    visible1: false,
    loading1: false,
}

export default function pigReducer(state = defaultState, action) {
    switch (action.type) {
        //初始化
        case actionType.INIT:
            return {
                ...defaultState,
                spin: action.spin,
                dataSource: action.dataSource,
                visible: action.visible,
                total: action.total,
                current: action.current,
                size: action.size
            }
        //显示spin
        case actionType.SPIN:
            return {...state, spin: action.spin}

        default:
            return state;

    }
}
