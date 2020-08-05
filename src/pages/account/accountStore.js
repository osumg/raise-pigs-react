const INIT = 'init';

async function init() {
    return dispatch => {
        fetch('/service/account/find-all')
            .then(response => response.json())
            .then(res => {
                dispatch(send(res))
            })
            .catch(error => console.error(error))
    }
}

function send(param) {
    return {
        type: INIT,
        dataSource: param
    }
}

const defaultState = {
    dataSource: []
}

export default function accountReducer(state = defaultState, action) {
    switch (action.type) {
        case INIT:
            return {...state, dataSource: action.dataSource};
        default:
            return {...state};
    }
}

export {init};
