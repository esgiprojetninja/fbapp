import * as types from "./participantTypes";
import ParticipantApi from "../API/participant/ParticipantApi";
import FacebookLoader from "../utils/FacebookLoader";

import {getCurrentContest} from "./contestActions";

const ptApi = new ParticipantApi();
const fbApi = new FacebookLoader();

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
        dispatch(requestAddPhotoToContest());
        ptApi.store(
            photo_id,
            (response) => {
                if (response.error) {
                    dispatch(receiveNotAddedPhotoContest(response));
                    dispatch(deleteFbPhoto(photo_id));
                } else {
                    dispatch(receiveAddPhotoToContest(response));
                    dispatch(getCurrentContest());
                }
            }
        )
    }
}

const requestDeletePhoto = () => {
    return {
        type: types.REQUEST_DELETE_PHOTO
    };
}

const deletePhoto = () => {
    return {
        type: types.DELETE_PHOTO
    };
}

const deleteFbPhoto = (photoid) => {
    return (dispatch) => {
        dispatch(requestDeletePhoto());
        const accessToken = getState().user.data.token;
        fbApi.deleteFbPhoto(photoid, accessToken, () => {
            if (response.success) {
                dispatch(deletePhoto());
            } else {
                dispatch(receiveError("Couldn't delete fb photo."));
            }
        });
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
          dispatch(receivedParticipationCancelling(getState().user.data.fb_id));
          dispatch(getCurrentContest());
        } else {
          dispatch(errorOnParticipationCancelling(response));
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

const receiveError = (error) => {
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
                dispatch(receiveError());
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

export const leaveUploadDisardingChanges = () => {
    return {
        type: types.DISCARD_FILEUPLOAD_MODAL
    }
}

export const previewImgUploaded = (source) => {
    return {
        type: types.PARTICIPANT_POSTED_IMG,
        imgSource: source
    }
}

export const removePreviewImg = () => {
    return {
        type: types.PARTICIPANT_CANCELLED_POSTED_IMG
    }
}

const requestFBPhotoUpload = (response) => {
    return {
        type: types.REQUEST_FB_PHOTO_UPLOAD
    }
}

const receiveUploadFail = (response) => {
    return {
        type: types.RECEIVE_FB_PHOTO_UPLOAD_FAIL,
        msg: response.error || "Erreur inconnue lors de la création de votre photo sur facebook"
    }
}

export const validPreviewImg = (msg = "") => {
    return (dispatch, getState) => {
        dispatch(requestFBPhotoUpload());
        const userFbId = getState().user.data.fb_id;
        const accessToken = getState().user.data.token;
        const imgData = getState().participant.fileUploadedSource;
        fbApi.postBinaryPhoto(accessToken, imgData, msg,
            (response) => {
                if ( response.error ) {
                    dispatch(receiveUploadFail(response));
                } else {
                    dispatch(addPhotoToCurrentContest(response.id));
                }
            }
        )
    }
}

export const noticedUploadPhotoNotice = () => {
    return {
        type: types.NOTICES_UPLOAD_PHOTO_PARTICIPATION
    }
}

export const closeAllModals = () => {
    return {
        type: types.CLOSE_ALL_MODALS
    }
}

const updateCurrentParticipantAfterVote = (participant) => {
    return {
        type: types.UPDATE_CURRENT_PARTICIPANT,
        participant
    }
}

export const reloadCurrentParticipantAfterVote = () => {
    return (dispatch, getState) => {
        console.debug("participantAction new part: ", getState().gallery.connected_participant);
        dispatch(updateCurrentParticipantAfterVote(getState().gallery.connected_participant))
    }
}
