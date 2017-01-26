import * as types from "./participantTypes";
import ParticipantApi from "../API/participant/ParticipantApi";

const ptApi = new ParticipantApi();

export const toggleSubmitPhotoModal = () => {
    return {
        type: types.TOGGLE_SUBMIT_PHOTO_MODAL
    };
};

const receiveNotAddedPhotoContest = ({added, msg}) => {
  return {
    type: types.RECEIVE_NOT_ADD_PHOTO_TO_CURRENT_CONTEST,
    addPhotoToContestError: msg || "Erreur inconnue lors de l'ajout de votre photo au concours"
  }
};

const receiveAddPhotoToContest = ({photo_id, current_contest_id, user_fbid, source, photo_votes}) => {
    return {
        type: types.RECEIVE_ADD_PHOTO_TO_CURRENT_CONTEST,
        photo_id,
        current_contest_id,
        user_fbid,
        photo_votes,
        source
    }
}

const requestAddPhotoToContest = () => {
  return {
    type: types.REQUEST_ADD_PHOTO_TO_CURRENT_CONTEST
  }
}

export const addPhotoToCurrentContest = (photo_id) => {
  return (dispatch, getState) => {
      dispatch(requestAddPhotoToContest())
      ptApi.store(
        photo_id,
        (response) => {
          if ( response.added ) {
            dispatch(receiveAddPhotoToContest(response))
          } else {
            dispatch(receiveNotAddedPhotoContest(response))
          }
        }
      )
  }
}

export const userNoticedRegistrationInContest = () => {
  return {
    type: types.USER_NOTICED_REGISTRATION
  }
}

export const toggleConsultingPostedPhoto = () => {
  return {
    type: types.TOGGLE_MODAL_POSTED_PHOTO
  }
}

const errorOnParticipationCancelling = () => {
  return {
    type: types.ERROR_PARTICIPATION_CANCELLING
  }
}

const receivedParticipationCancelling = () => {
  return {
    type: types.RECEIVED_PARTICIPATION_CANCELLING
  }
}

const requestParticipationCancelling = () => {
  return {
    type: types.REQUEST_CANCEL_PARTICIPATION
  }
}

export const cancelParticipation = (user_id = false, contest_id = false) => {
  return (dispatch, getState) => {
    dispatch(requestParticipationCancelling())
    ptApi.deleteFromCurrent(
      {user_id, contest_id},
      (response) => {
        if ( response.error ) {
          dispatch(errorOnParticipationCancelling(response))
        } else {
          dispatch(receivedParticipationCancelling(response))
        }
      }
    )
  }
}
