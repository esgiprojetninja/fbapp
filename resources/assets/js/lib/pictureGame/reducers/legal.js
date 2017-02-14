import * as legalTypes from "../actions/legalTypes";

const initialSate = {
    CGU: "",
    privacyPolicy: "",
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
        default:
            return state;
    }
}

export default legal;
