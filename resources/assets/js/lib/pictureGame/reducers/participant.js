import * as pTypes from "../actions/participantTypes";

const initialSate = {
    modalOpen: false,
    currentContest: []
};

const participant = (state = initialSate, action) => {
    delete state.addPhotoToContestError;
    switch (action.type) {
        case pTypes.TOGGLE_SUBMIT_PHOTO_MODAL:
            return {
                ...state,
                modalOpen: !state.modalOpen
            };
        case pTypes.REQUEST_ADD_PHOTO_TO_CURRENT_CONTEST:
          return {
            ...state,
            isFetching: true
          };
        case pTypes.RECEIVE_ADD_PHOTO_TO_CURRENT_CONTEST:
          state.currentContest.push({id: action.photo_id, source: action.source});
          return {
            ...state,
            isFetching: false
          };
        case pTypes.RECEIVE_NOT_ADD_PHOTO_TO_CURRENT_CONTEST:
          return {
            ...state,
            addPhotoToContestError: action.addPhotoToContestError,
            isFetching: false
          };
        default:
            return state;
    }
};

export default participant;
