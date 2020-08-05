const INIT = 'init';

function init() {
    return dispatch => {
        fetch('/service/account/find-all')
            .then(response => response.json())
            .then(res => {
                dispatch({
                    type: INIT,
                    dataSource: res
                })
            })
            .catch(error => console.error(error))
    }
}

const defaultState = {
    dataSource: []
}

export default function accountReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT:
            return {...state,dataSource: action.dataSource};
        default:
            return {...state};
    }
}

export {init};
