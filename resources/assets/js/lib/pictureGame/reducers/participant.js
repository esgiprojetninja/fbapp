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
        default:
            return state;
    }
};

export default participant;
