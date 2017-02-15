import * as types from "./voteTypes";
import ContestApi from "../API/contest/ContestApi";
import ParticipantApi from "../API/participant/ParticipantApi";

import {removeParticipantFromCurrentContest} from "./contestActions";

const ptApi = new ParticipantApi();
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

const receivedParticipationCancelling = (id_user) => {
    return {
        type: types.RECEIVED_PARTICIPATION_CANCELLING,
        id_user
    }
}

const requestParticipationCancelling = () => {
    return {
        type: types.REQUEST_PARTICIPATION_REMOVE
    }
}

export const cancelParticipation = (id_user = false, contest_id = false) => {
    return (dispatch, getState) => {
        if ( contest_id === false ){
            contest_id = getState().contest.currentContest.id;
        }
        dispatch(requestParticipationCancelling())
        ptApi.deleteFromCurrent(
            {id_user, contest_id},
            (response) => {
                if (response.deleted === true) {
                    dispatch(receivedParticipationCancelling(id_user));
                    dispatch(removeParticipantFromCurrentContest(id_user));
                } else {
                    dispatch(receiveError(response.msg || "Erreur inconnue lors de la supression"));
                }
            }
        )
    }
}
