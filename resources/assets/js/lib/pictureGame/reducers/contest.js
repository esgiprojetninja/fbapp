import * as actionTypes from "../actions/contestTypes";

const initialSate = {
    contests: [],
    newContest: {
        title: "",
        description: "",
        state: "",
    },
    isFetching: false,
    createModalOpen: false,
    error: false
};

const contest = (state = initialSate, action) => {
    switch(action.type) {
        case actionTypes.REQUEST_CONTESTS:
            return {
                ...state,
                isFetching: true,
                error: false
            }
        case actionTypes.RECIEVE_ERROR:
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        case actionTypes.RECIEVE_CONTEST:
            return {
                ...state,
                contests: [
                    ...contests,
                    action.contest
                ],
                isFetching: false,
                error: false
            }
        case actionTypes.RECIEVE_CONTESTS:
            return {
                ...state,
                contests: action.contests,
                isFetching: false,
                error: false
            }
        case actionTypes.TOGGLE_CREATE_MODAL:
            return {
                ...state,
                createModalOpen: !state.createModalOpen
            }
        case actionTypes.NEW_CONTEST_CHANGE:
            state.newContest[action.attr] = action.value;
            console.debug(state.newContest);
            return state;
        default:
            return state;
    }
}

export default contest;
