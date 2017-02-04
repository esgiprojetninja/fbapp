import * as pTypes from "../actions/participantTypes";

const initialSate = {
    modalOpen: false,
    isFetching: false,
    addPhotoToContestError: false,
    photoSucessfullyAdded: false,
    consultingPostedPhoto: false,
    deletingParticipationOngoing: false,
    participationCancelled: false,
    fileUploadModal: false,
    fileUploadedSource: "",
    currentParticipant: {}
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
            return {
                ...state,
                currentParticipant: action.participant,
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
                deletingParticipationOngoing: true,
                participationCancelled: false
            }
        case pTypes.ERROR_PARTICIPATION_CANCELLING:
            return {
                ...state,
                consultingPostedPhoto: true,
                deletingParticipationOngoing: false,
                participationCancelled: "failed"
            }
        case pTypes.RECEIVED_PARTICIPATION_CANCELLING:
            return {
                ...state,
                currentParticipant: {},
                consultingPostedPhoto: false,
                deletingParticipationOngoing: false,
                participationCancelled: "success"
            }
        case pTypes.NOTICED_PARTICIPATION_CANCELLING_RESPONSE:
            return {
                ...state,
                consultingPostedPhoto: false,
                deletingParticipationOngoing: false,
                participationCancelled: false
            }
        case pTypes.RECIEVE_ERROR:
            return {
                ...state,
                isFetching: false
            }
        case pTypes.RECIEVE_CURRENT_PARTICIPANT:
            return {
                ...state,
                currentParticipant: action.participant
            }
        case pTypes.DISPLAY_FILEUPLOAD_MODAL:
            return {
                ...state,
                fileUploadModal: true,
                modalOpen: false
            }
        case pTypes.DISCARD_FILEUPLOAD_MODAL:
            return {
                ...state,
                fileUploadModal: false,
                modalOpen: true
            }
        case pTypes.PARTICIPANT_POSTED_IMG:
            return {
                ...state,
                fileUploadedSource: action.imgSource
            }
        default:
            return state;
    }
};

export default participant;
