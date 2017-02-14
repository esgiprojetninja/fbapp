import * as types from "./galleryTypes";
import ParticipantApi from "../API/participant/ParticipantApi";
import FBLoader from "../utils/FacebookLoader";

const ptApi = new ParticipantApi();
const fbApi = new FBLoader();

const receiveError = (error) => {
    console.warn(error); // TODO remove this on prod
    return {
        type: types.RECEIVE_ERROR,
        error: error
    }
}


export const closePhoto = () => {
    return {
        type: types.CLOSE_PHOTO
    }
}

const switchToPhoto = (photo) => {
    return {
        type: types.OPEN_PHOTO,
        photo
    }
}

export const openPhoto = (participant_id) => {
    return (dispatch, getState) => {
        dispatch(switchToPhoto(getState().contest.currentContest.participants.find( (p) => p.id === participant_id)));
    }
}



const requestSaveVote = () => {
    return {
        type: types.REQUEST_SAVE_VOTE
    }
}

const receiveVoteSaved = ({aimed_participant, connected_participant}) => {
    return {
        type: types.RECEIVE_VOTE_SAVED,
        aimed_participant,
        connected_participant
    }
}

export const voteForDisplaidPhoto = () => {
    return (dispatch, getState) => {
        dispatch(requestSaveVote());
        ptApi.saveVote(
            getState().gallery.consultingPhoto,
            (response) => {
                if (response.error) {
                    dispatch(receiveError(response.msg));
                }
                else {
                    dispatch(receiveVoteSaved(response));
                }
            }
        );
    }
}

export const voteSuccessNoticed = () => {
    return {
        type: types.VOTE_SUCCESS_NOTICED
    }
}

export const noticedVoteErrorMsg = () => {
    return {
        type: types.VOTE_FAIL_MSG_NOTICE
    }
}

const receivePhotoShared = (response) => {
    return {
        type: types.RECEIVE_PHOTO_SHARED
    }
}

const requestSharePhoto = (data) => {
    return {
        type: types.REQUEST_SHARE_PHOTO
    }
}

export const sharePhoto = () => {
    return (dispatch, getState) => {
        dispatch(requestSharePhoto())
        fbApi.sharePhoto(
            getState().user.data.token,
            getState().gallery.consultingPhoto,
            (response) => {
                if ( response && response.post_id ) {
                    dispatch(receivePhotoShared(response));
                } else {
                  if (response === undefined){
                      response = {
                          error: true,
                          error_message: "Partage annulé"
                      };
                  }
                  dispatch(receiveError(response.error_message));
                }

            }
        )
    }
}
