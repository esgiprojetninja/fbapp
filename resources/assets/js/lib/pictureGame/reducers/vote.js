import * as voteTypes from "../actions/voteTypes";

const initialSate = {
    open: false,
    isFetching: false,
    participants: []
};

const contest = (state = initialSate, action) => {
    switch(action.type) {
        case voteTypes.OPEN_MODAL:
            return {
                ...state,
                open: true
            }
        case voteTypes.REQUEST_CURRENT_CONTEST_VOTES:
            return {
                ...state,
                isFetching: true
            }
        default:
            return state;
    }
}

export default contest;
