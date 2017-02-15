import * as types from "./voteTypes";
import ContestApi from "../API/contest/ContestApi";

const contestApi = new ContestApi();

const receiveError = (error) => {
    return {
        type: types.RECEIVE_ERROR,
        error
    }
}

const receiveCurrentVotes = (data) => {
    return {
        type: types.RECEIVE_CURRENT_VOTES,
        data
    }
}

const requestCurrentContestVotes = () => {
    return {
        type: types.REQUEST_CURRENT_VOTES
    }
}

export const getCurrentContestVoters = () => {
    return (dispatch) => {
        dispatch(requestCurrentContestVotes())
        contestApi.getCurrentVotes(
            (response) => {
                if ( response.error ) {
                    dispatch(receiveError(response))
                } else {
                    dispatch(receiveCurrentVotes(response.currentVotes))
                }
            }
        )
    }
}


export const openVotes = () => {
    return {
        type: types.OPEN_MODAL
    }
}
