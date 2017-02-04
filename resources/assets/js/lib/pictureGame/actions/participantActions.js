import * as types from "./participantTypes";
import ParticipantApi from "../API/participant/ParticipantApi";

const ptApi = new ParticipantApi();

export const toggleSubmitPhotoModal = () => {
    return {
        type: types.TOGGLE_SUBMIT_PHOTO_MODAL
    };
};

const receiveNotAddedPhotoContest = ({msg}) => {
  return {
    type: types.RECEIVE_NOT_ADD_PHOTO_TO_CURRENT_CONTEST,
    addPhotoToContestError: msg || "Erreur inconnue lors de l'ajout de votre photo au concours"
  }
};

const receiveAddPhotoToContest = (data) => {
    return {
        type: types.RECEIVE_ADD_PHOTO_TO_CURRENT_CONTEST,
        participant: data.participant
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
          if (response.error) {
              dispatch(receiveNotAddedPhotoContest(response))
          } else {
              dispatch(receiveAddPhotoToContest(response))
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

const receivedParticipationCancelling = (user_fbid) => {
  return {
    type: types.RECEIVED_PARTICIPATION_CANCELLING,
    user_fbid
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
        if (response.deleted === true) {
          dispatch(receivedParticipationCancelling(getState().user.data.fb_id))
        } else {
          dispatch(errorOnParticipationCancelling(response))
        }
      }
    )
  }
}

export const noticedCancelNotice = () => {
  return {
    type: types.NOTICED_PARTICIPATION_CANCELLING_RESPONSE
  }
}

const requestCurrentPlayer = () => {
    return {
        type: types.REQUEST_CURRENT_PLAYER
    }
}

const recieveError = (error) => {
    console.warn(error); // TODO remove this on prod
    return {
        type: types.RECIEVE_ERROR,
        error: error
    }
}

const recieveCurrentParticipant = (participant) => {
    return {
        type: types.RECIEVE_CURRENT_PARTICIPANT,
        participant
    }
}

export const getCurrentParticipant = () => {
    return (dispatch) => {
        dispatch(requestCurrentPlayer());
        ptApi.getCurrentParticipant(r => {
            if (r.error) {
                dispatch(recieveError());
            }
            else {
                dispatch(recieveCurrentParticipant(r.participant));
            }
        });
    }
}

export const displayFileUploadModal = () => {
    return {
      type: types.DISPLAY_FILEUPLOAD_MODAL
    }
}
