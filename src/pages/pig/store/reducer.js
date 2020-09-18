import actionType from "./actionType";

const defaultState = {
    dataSource: [],
    account: '',
    spin: false,

    current: 1,
    size: 10,
    total: 100,

    //搜索
    idOfSearch: '',

    // modal 数据
    visible: false,
    loadingOfAdd: false,
    kindMenu: [],
    kindIndex: 0,
    genderMenu: [{kindName: '公', value: 0}, {kindName: '母', value: 1}],
    genderIndex: 0,

    // modify modal 数据
    visibleOfModify: false,
    loadingOfModify: false,
    idOfModify: '',
    ageOfModify: '',
    ageOfModifyTip: ''

}

export default function pigReducer(state = defaultState, action) {
    switch (action.type) {
        //初始化
        case actionType.INIT_PIG:
            return {
                ...defaultState,
                spin: action.spin,
                dataSource: action.dataSource,
                visible: action.visible,
                total: action.total,
                current: action.current,
                size: action.size
            }

        //搜索
        case actionType.SET_ID_OF_SEARCH_PIG:
            return {...state, idOfSearch: action.idOfSearch}
        case actionType.SEARCH_PIG:
            return {
                ...defaultState,
                dataSource: action.dataSource,
                total: action.total,
                current: action.current,
                size: action.size,
                spin: action.spin
            }

        //显示spin
        case actionType.SPIN_PIG:
            return {...state, spin: action.spin}
        case actionType.SET_VISIBLE_PIG:
            return {...state, visible: action.visible}
        case actionType.SET_ADD_AGE:
            return {...state, addAge: action.addAge, addAgeTip: action.addAgeTip}
        case actionType.ADD_PIG_BEFORE:
            return {...state, loadingOfAdd: action.loadingOfAdd}
        case  actionType.ADD_PIG_AFTER:
            return {...state, loadingOfAdd: action.loadingOfAdd, visible: action.visible}
        case actionType.SET_PIG_KIND:
            return {...state, kindMenu: action.kindMenu}
        case actionType.SET_KIND_OF_ADD:
            return {...state, kindIndex: action.kindIndex}
        case actionType.SET_GENDER_OF_ADD:
            return {...state, genderIndex: action.genderIndex}
        case actionType.SHOW_MODIFY_MODAL:
            return {...state, visibleOfModify: action.visibleOfModify, idOfModify: action.idOfModify}
        case actionType.SET_VISIBLE_OF_MODAL:
            return {...state, visibleOfModify: action.visibleOfModify}
        case actionType.SET_AGE_OF_MODIFY:
            return {...state, ageOfModify: action.ageOfModify, ageOfModifyTip: action.ageOfModifyTip}
        case actionType.MODIFY_PIG_BEFORE:
            return {...state, loadingOfModify: action.loadingOfModify}
        case actionType.MODIFY_PIG_AFTER:
            return {...state, loadingOfModify: action.loadingOfModify, visibleOfModify: action.visibleOfModify}
        default:
            return state;

    }
}
