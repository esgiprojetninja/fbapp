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
        type: actionTypes.REQUEST_CONTESTS,
        contests: contests
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
        })
    }
}
