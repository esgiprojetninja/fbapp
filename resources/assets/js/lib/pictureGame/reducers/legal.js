import * as legalTypes from "../actions/legalTypes";

const initialSate = {
    id: 0,
    CGU: "",
    privacy_policy: "",
    rules: "",
    isFetching: false,
    erro: ""
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
                isFetching: false,
                legal: action.legal
            };
        case legalTypes.REQUEST_SAVE_LEGAL:
            return {
                ...state,
                isFetching: true
            }
        case legalTypes.RECEIVE_SAVE_LEGAL_SUCCESS:
            return {
                ...state,
                legal: action.legal
            }
        case legalTypes.CHANGE_CGU:
            return {
                ...state,
                CGU: action.cgu
            }
        default:
            return state;
    }
}

export default legal;
