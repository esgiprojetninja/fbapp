import * as nTypes from "../actions/noticeTypes";

const initialSate = {
    open: false,
    autoHideDuration: 10000
};

const notice = (state = initialSate, action) => {
    switch (action.type) {
        case nTypes.CLOSE_NOTICE:
            return {
                ...state,
                open: false
        };
        case nTypes.OPEN_NOTICE:
            return {
                ...state,
                open: true
        };
        default:
            return state;
    }
};

export default notice;
