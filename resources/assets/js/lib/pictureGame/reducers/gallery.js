import * as gTypes from "../actions/galleryTypes";

const initialSate = {
    open: false,
    isFetching: false,
    errorMsg: false,
    consultingPhoto: false,
    connected_participant: false,
    aimed_participant: false
};

const gallery = (state = initialSate, action) => {
    switch (action.type) {
        case gTypes.OPEN_PHOTO:
            const _open = state.isFetching === false && state.connected_participant === false && state.aimed_participant === false;
            return {
                ...state,
                consultingPhoto: {...action.photo},
                open: _open
        };
        case gTypes.CLOSE_PHOTO:
            return {
                ...state,
                open: false
            };
        case gTypes.RECEIVE_ERROR:
            return {
                ...state,
                isFetching: false,
                errorMsg: action.error
            };
        case gTypes.REQUEST_SAVE_VOTE:
            return {
                ...state,
                isFetching: true,
                open: false
            };
        case gTypes.RECEIVE_VOTE_SAVED:
            return {
                ...state,
                isFetching: false,
                open: false,
                connected_participant: action.connected_participant,
                aimed_participant: action.aimed_participant
            }
        case gTypes.VOTE_SUCCESS_NOTICED:
            return {
                ...state,
                connected_participant: false,
                aimed_participant: false,
                open: false
            }
        case gTypes.VOTE_FAIL_MSG_NOTICE:
            return {
                ...state,
                connected_participant: false,
                aimed_participant: false,
                errorMsg: false,
                open: false
            }
        default:
            return state;
    }
};

export default gallery;
