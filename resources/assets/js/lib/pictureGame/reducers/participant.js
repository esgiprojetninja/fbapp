import * as pTypes from "../actions/participantTypes";

const initialSate = {
    modalOpen: false
};

const participant = (state = initialSate, action) => {
    switch (action.type) {
        case pTypes.TOGGLE_SUBMIT_PHOTO_MODAL:
            return {
                ...state,
                modalOpen: !state.modalOpen
            };
        case pTypes.REQUEST_ADD_PHOTO_TO_CONTEST:
          console.debug("Reducer was informed of sent request")
          return {
            ...state,
            isFetching: true
          };
        case pTypes.RECEIVE_ADD_PHOTO_TO_CONTEST:
          console.debug("Reducer was informed of received response", action)
          return {
            ...state,
            isFetching: false
          }
        default:
            return state;
    }
};

export default participant;
