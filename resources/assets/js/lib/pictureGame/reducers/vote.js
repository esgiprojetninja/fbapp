import * as voteTypes from "../actions/voteTypes";

const initialSate = {
    open: false,
    isFetching: false,
    errorMsg: false,
    participants: []
};

const contest = (state = initialSate, action) => {
    switch(action.type) {
        case voteTypes.OPEN_MODAL:
            return {
                ...state,
                open: true
            }
        case voteTypes.RECEIVE_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMsg: action.error
            }
        case voteTypes.REQUEST_CURRENT_VOTES:
            return {
                ...state,
                isFetching: true
            }
        case voteTypes.RECEIVE_CURRENT_VOTES:
            return {
                ...state,
                isFetching: false,
                participants: action.data
            }
        default:
            return state;
    }
}

export default contest;
