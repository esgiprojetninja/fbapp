import * as types from "./participantTypes";
import ParticipantApi from "../API/participant/ParticipantApi";

const ptApi = new ParticipantApi();

export const toggleSubmitPhotoModal = () => {
    return {
        type: types.TOGGLE_SUBMIT_PHOTO_MODAL
    };
};


const receiveAddPhotoToContest = (response) => {
  console.debug("receivePostResponse received notice of answer", response)
    return {
        type: types.RECEIVE_ADD_PHOTO_TO_CONTEST,
        isFetching: false,
        data: response
    }
}

export const requestAddPhotoToContest = () => {
  console.debug("requestAddPhotoToContest warned")
  return {
    type: types.REQUEST_ADD_PHOTO_TO_CONTEST
  }
}

export const addPhotoToCurrentContest = (photo_id) => {
  console.debug("addPhotoToCurrentContest was called with", photo_id)
  return (dispatch, getState) => {
      dispatch(requestAddPhotoToContest())
      ptApi.store(
        photo_id,
        (response) => {
          console.debug("addPhotoToCurrentContest: server returned response", response);
          dispatch(receiveAddPhotoToContest(response))
        }
      )
  }
}
