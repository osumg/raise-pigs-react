import actionType from "./actionType";
import {fetchDelete, fetchGet, fetchPost, fetchPut} from "../../../utils/fetchUtils";

//初始化
const init = (current, size) => {
    return dispatch => {
        getListData(dispatch, current, size)
    };
}

// 获取用户数据列表
const getListData = (dispatch, current, size) => {
    showSpin(dispatch);
    fetchPost(`/service/pig/find`, {
        current, size
    }, (res) => {
        // age: 3
        // createBy: ""
        // createTime: ""
        // expectBirthDate: ""
        // gender: 1
        // id: "123456"
        // inspect: 0
        // kindId: "123456"
        // kindName: "黑猪"
        // number: 1
        // pregnant: 0
        // sale: 0
        // status: 1
        // updateBy: ""
        // updateTime: ""
        let records = res.records.map(item => {
            const {gender, inspect, pregnant, sale, status} = item;
            item.genderMean = gender === 0 ? '公' : '母';
            item.inspectMean = inspect === 0 ? '否' : '是';
            item.pregnantMean = pregnant === 0 ? '否' : '是';
            item.saleMean = sale === 0 ? '未售出' : '售出';
            item.statusMean = status === 0 ? '不健康' : '健康';

            return item;
        });

        dispatch({
            type: actionType.INIT_PIG,
            dataSource: records,
            total: res.total,
            current: current,
            size: size,
            spin: false,
        })
    })
}

const showSpin = fun => {
    fun({
        type: actionType.SPIN_PIG,
        spin: true
    })
}

const setIdOfSearch = (e) => {
    let value = e.target.value.trim();
    return {
        type: actionType.SET_ID_OF_SEARCH_PIG,
        idOfSearch: value
    }
}

const searchPig = () => {
    return (dispatch, getState) => {
        const {idOfSearch, current, size} = getState().pigReducer;
        showSpin(dispatch);
        fetchPost('/service/pig/find', {
            id: idOfSearch,
            current: 1,
            size: size
        }, res => {
            let records = res.records.map(item => {
                const {gender, inspect, pregnant, sale, status} = item;
                item.genderMean = gender === 0 ? '公' : '母';
                item.inspectMean = inspect === 0 ? '否' : '是';
                item.pregnantMean = pregnant === 0 ? '否' : '是';
                item.saleMean = sale === 0 ? '未售出' : '售出';
                item.statusMean = status === 0 ? '不健康' : '健康';
                return item;
            });

            dispatch({
                type: actionType.SEARCH_PIG,
                dataSource: records,
                total: res.total,
                current: current,
                size: size,
                spin: false
            })
        })
    }
}
const setVisiblePig = (visible) => {
    return (dispatch, getState) => {
        dispatch({
            type: actionType.SET_VISIBLE_PIG,
            visible
        })
        fetchPost('/service/kind/find', {
            current: 1,
            size: 99
        }, res => {
            dispatch({
                type: actionType.SET_PIG_KIND,
                kindMenu: res.records
            })
        })
    }
}
const addPig = () => {
    return (dispatch, getState) => {
        const {genderMenu, genderIndex, kindMenu, kindIndex, addAge, current, size} = getState().pigReducer;
        dispatch({
            type: actionType.ADD_PIG_BEFORE,
            loadingOfAdd: true,
        })
        fetchPost('/service/pig/add', {
            age: addAge,
            kindId: kindMenu[kindIndex].id,
            gender: genderMenu[genderIndex].value
        }, res => {
            dispatch({
                type: actionType.ADD_PIG_AFTER,
                loadingOfAdd: false,
                visible: false
            })
            getListData(dispatch, current, size);
        })
    }
}

const setAddAge = (e) => {
    let val = e.target.value.trim();
    let tip = '';
    if (!/^[0-9]{1,2}$/.test(val)) {
        tip = '年龄为1~2位数字';
    }
    return {
        type: actionType.SET_ADD_AGE,
        addAge: val,
        addAgeTip: tip
    }
}

const setKindOfAdd = (item) => {
    return {
        type: actionType.SET_KIND_OF_ADD,
        kindIndex: item.key * 1
    }
}

const setGenderOfAdd = (item) => {
    return {
        type: actionType.SET_GENDER_OF_ADD,
        genderIndex: item.key * 1
    }
}

const showModifyModal = (id) => {
    return {
        type: actionType.SHOW_MODIFY_MODAL,
        idOfModify: id,
        visibleOfModify: true
    }
}

const setVisibleOfModal = (visibleOfModal) => {
    return {
        type: actionType.SET_VISIBLE_OF_MODAL,
        visibleOfModal
    }
}

const setAgeOfModify = (e) => {
    let value = e.target.value.trim();
    let tip = '';
    if (!/^[0-9]{1,2}$/.test(value)) {
        tip = '年龄为1~2位数字';
    }
    return {
        type: actionType.SET_AGE_OF_MODIFY,
        ageOfModify: value,
        ageOfModifyTip: tip
    };
}

const modifyPig = () => {
    return (dispatch, getState) => {
        const {ageOfModify, idOfModify, current, size} = getState().pigReducer;
        dispatch({
            type: actionType.MODIFY_PIG_BEFORE,
            loadingOfModify: true,
        })
        fetchPut('/service/pig/modify', {
            id: idOfModify,
            age: ageOfModify,
        }, res => {
            dispatch({
                type: actionType.MODIFY_PIG_AFTER,
                loadingOfModify: false,
                visibleOfModify: false
            })
            getListData(dispatch, current, size);
        })
    }
}

const deleteById = (id) => {
    return (dispatch, getState) => {
        const {current, size} = getState().pigReducer;
        fetchDelete(`/service/pig/delete/${id}`, res => {
            getListData(dispatch, current, size);
        })
    }
}

export default {
    init,
    setIdOfSearch,
    setVisiblePig,
    addPig,
    setAddAge,
    setKindOfAdd,
    setGenderOfAdd,
    showModifyModal,
    setVisibleOfModal,
    setAgeOfModify,
    modifyPig,
    searchPig,
    deleteById
}
