import * as actionTypes from "./contestTypes";
import ContestApi from "../API/contest/ContestApi";

const contestApi = new ContestApi();

const generateFreshContest = () => {
    return {
        start_date: new Date(),
        end_date: new Date(),
        end_msg: "",
        description: "",
        title: "",
        id_winner: 0,
        active: false
    }
}

export const requestContests = () => {
    return {
        type: actionTypes.REQUEST_CONTESTS
    };
}

export const recieveError = (error) => {
    return {
        type: actionTypes.RECIEVE_ERROR,
        error: error
    };
}

export const recieveContests = (contests) => {
    return {
        type: actionTypes.RECIEVE_CONTESTS,
        contests: contests
    }
}

export const storeContest = () => {
    return (dispatch, getState) => {
        dispatch(requestContests());
        contestApi.store(getState().contest.newContest, (response) => {
            if (!response.error) {
                dispatch(getContests());
            } else {
                dispatch(recieveError(response.error));
            }
        });
        dispatch(toggleCreateModal()); // TODO move this away
    }
}

export const getContests = () => {
    return (dispatch) => {
        dispatch(requestContests());
        contestApi.getAll(response => {
            if (!response.error) {
                dispatch(recieveContests(response.contests));
            } else {
                dispatch(recieveError(response.error));
            }
        });
    };
}

export const deleteContest = (id) => {
    return (dispatch) => {
        contestApi.delete(id, (response) => {
            if(!response.error) {
                dispatch(getContests());
            } else {
                dispatch(recieveError(response.error));
            }
        })
    }
}

export const activateContest = (id) => {
    return (dispatch) => {
        contestApi.activate(id, (response) => {
            if(!response.error) {
                dispatch(getContests());
            } else {
                dispatch(recieveError(response.error));
            }
        })
    }
}

export const toggleCreateModal = (contest) => {
    if (!contest) {
        contest = generateFreshContest();
    }
    return {
        type: actionTypes.TOGGLE_CREATE_MODAL,
        newContest: contest
    };
}

export const newContestChange = (attr, value) => {
    return {
        type: actionTypes.NEW_CONTEST_CHANGE,
        attr: attr,
        value: value
    };
}
