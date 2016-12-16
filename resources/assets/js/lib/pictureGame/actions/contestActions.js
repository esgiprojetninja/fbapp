import * as actionTypes from "./contestTypes";
import ContestApi from "../API/contest/ContestApi";

const contestApi = new ContestApi();

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

export const createContest = (data) => {
    return (dispatch, getState) => {
        dispatch(requestContests());
        dispatch(toggleCreateModal()); // TODO move this away
        contestApi.create(getState().contest.newContest, (response) => {
            if (!response.error) {
                dispatch(getContests());
            } else {
                dispatch(recieveError(response.error));
            }
        });
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

export const toggleCreateModal = () => {
    return {
        type: actionTypes.TOGGLE_CREATE_MODAL
    };
}

export const newContestChange = (attr, value) => {
    return {
        type: actionTypes.NEW_CONTEST_CHANGE,
        attr: attr,
        value: value
    };
}
