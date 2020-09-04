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

const showSpin = fun => {
    fun({
        type: actionType.SPIN,
        spin: true
    })
}

export default {
    init
}
