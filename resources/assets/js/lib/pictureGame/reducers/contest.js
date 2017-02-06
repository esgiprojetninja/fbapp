import * as actionTypes from "../actions/contestTypes";

const initialSate = {
    contests: [],
    newContest: {
        start_date: new Date(),
        end_date: new Date(),
        end_msg: "",
        description: "",
        title: "",
        id_winner: 0,
        state: false
    },
    currentContest: false,
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
                createModalOpen: !state.createModalOpen,
                newContest: action.newContest
            }
        case actionTypes.NEW_CONTEST_CHANGE:
            const contest = Object.assign({}, state.newContest);
            contest[action.attr] = action.value;
            return {
                ...state,
                newContest: contest
            };
        case actionTypes.RECIEVE_CURRENT_CONTEST:
            return {
                ...state,
                isFetching: false,
                currentContest: action.contest
            };
        default:
            return state;
    }
}

export default contest;
