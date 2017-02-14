import * as legalTypes from "../actions/legalTypes";

const initialSate = {
    id: 0,
    cgu: "",
    privacy_policy: "",
    rules: "",
    isFetching: false,
    error: ""
};

const legal = (state = initialSate, action) => {
    switch (action.type) {
        case legalTypes.REQUEST_LEGAL:
            return {
                ...state,
                isFetching: true
            };
        case legalTypes.RECEIVE_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            };
        case legalTypes.RECEIVE_LEGAL:
            return {
                ...state,
                ...action.legal,
                isFetching: false,
                error: ""
            };
        case legalTypes.REQUEST_SAVE_LEGAL:
            return {
                ...state,
                isFetching: true
            }
        case legalTypes.CHANGE_CGU:
            return {
                ...state,
                cgu: action.cgu
            }
        default:
            return state;
    }
}

export default legal;
