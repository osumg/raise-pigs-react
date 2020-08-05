const INIT = 'init';

function init() {
    return {
        type: INIT
    }
}


export default function pigReducer(total = 1, action) {
    switch (action.type) {
        case 'sdfja':
            return total + 1;
        default:
            return 3;
    }
}



export {init}
