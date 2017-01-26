import * as pTypes from "../actions/participantTypes";

const initialSate = {
  modalOpen: false,
  addPhotoToContestError: false,
  photoSucessfullyAdded: false,
  consultingPostedPhoto: false,
  deletingParticipationOngoing: false,
  currentContest: []
};

const participant = (state = initialSate, action) => {
  switch (action.type) {
    case pTypes.TOGGLE_SUBMIT_PHOTO_MODAL:
      return {
          ...state,
          modalOpen: !state.modalOpen
      };
    case pTypes.REQUEST_ADD_PHOTO_TO_CURRENT_CONTEST:
      return {
        ...state,
        modalOpen: false,
        isFetching: true
      };
    case pTypes.RECEIVE_ADD_PHOTO_TO_CURRENT_CONTEST:
      state.currentContest.push({photo_id: action.photo_id, source: action.source, user_fbid: action.user_fbid, photo_votes: action.photo_votes});
      return {
        ...state,
        photoSucessfullyAdded: true,
        modalOpen: false,
        isFetching: false
      };
    case pTypes.RECEIVE_NOT_ADD_PHOTO_TO_CURRENT_CONTEST:
      return {
        ...state,
        addPhotoToContestError: action.addPhotoToContestError,
        photoSucessfullyAdded: false,
        modalOpen: false,
        isFetching: false
      };
    case pTypes.USER_NOTICED_REGISTRATION:
      return {
        ...state,
        photoSucessfullyAdded: initialSate.photoSucessfullyAdded,
        addPhotoToContestError: initialSate.addPhotoToContestError
      };
    case pTypes.TOGGLE_MODAL_POSTED_PHOTO:
      return {
        ...state,
        consultingPostedPhoto: !state.consultingPostedPhoto
      }
    case pTypes.REQUEST_CANCEL_PARTICIPATION:
      return {
        ...state,
        consultingPostedPhoto: false,
        deletingParticipationOngoing: true
      }
    case pTypes.ERROR_PARTICIPATION_CANCELLING:
      return {
        ...state,
        consultingPostedPhoto: true,
        deletingParticipationOngoing: false
      }
    case pTypes.RECEIVED_PARTICIPATION_CANCELLING:
      return {
        ...state,
        consultingPostedPhoto: false,
        deletingParticipationOngoing: false
      }
    default:
      return state;
  }
};

export default participant;
