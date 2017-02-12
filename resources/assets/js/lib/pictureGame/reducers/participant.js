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
    fileUploadRequest: false,
    fileUploadError: false,
    currentParticipant: {},
    acceptedFBPublish: undefined,
    publishPreview: {
        data: {},
        dom: ""
    }
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
                fileUploadModal: false,
                isFetching: true
            };
        case pTypes.RECEIVE_ADD_PHOTO_TO_CURRENT_CONTEST:
            return {
                ...state,
                currentParticipant: action.participant,
                photoSucessfullyAdded: true,
                modalOpen: false,
                fileUploadedSource: "",
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
        case pTypes.PARTICIPANT_CANCELLED_POSTED_IMG:
            return {
                ...state,
                fileUploadedSource: ""
            }
        case pTypes.REQUEST_FB_PHOTO_UPLOAD:
            return {
                ...state,
                fileUploadRequest: true,
                isFetching: true
            }
        case pTypes.RECEIVE_FB_PHOTO_UPLOAD_FAIL:
            return {
                ...state,
                fileUploadRequest: false,
                fileUploadError: action.msg,
                isFetching: false
            }
        case pTypes.NOTICES_UPLOAD_PHOTO_PARTICIPATION:
            return {
                ...state,
                fileUploadRequest: false,
                fileUploadError: false,
                isFetching: false,
                fileUploadModal: false,
                fileUploadedSource: ""
            }
        case pTypes.CLOSE_ALL_MODALS:
            return {
                ...state,
                fileUploadModal: false,
                modalOpen: false
            }
        case pTypes.UPDATE_CURRENT_PARTICIPANT:
            return {
                ...state,
                currentParticipant: action.participant
            }
        case pTypes.REQUEST_PUBLISH_PREVIEW_DATA:
            return {
                ...state
            }
        case pTypes.RECEIVE_PUBLISH_PREVIEW_DATA:
            //Helvetica, Arial, sans-serif
            return {
                ...state,
                publishPreview: {
                    dom: `
                        <div className="publish_preview_container">
                            <div className="publish_preview_header display-flex-column justify-start align-start full-width margin-reset">
                                <img className="width-2 full-height margin-reset align-start" src="${action.data.profile_icon_url}"/>
                                <h3 className="width-5 full-height display-flex-row align-start margin-reset">${action.data.user_name}</h3>
                            </div>
                            <div className="display-flex-row full-width margin-reset">
                                <p className="text-left full-width publish_preview_message">${action.data.message}</p>
                                <img className="full-width margin-auto align-start" src="${action.data.picture}"/>
                                <p className="publish_preview_img_subtitle full-width text-left text-bold">${action.data.name}</p>
                                <caption className="full-width margin-reset align-start uppercase">${action.data.caption}</caption>
                            </div>
                        </div>`,
                    data: action.data
                }
            }
        case pTypes.CHANGE_PUBLISH_PREVIEW_SOURCE:
            return {
                ...state,
                publishPreview: {
                    ...state.publishPreview,
                    data: {
                        ...state.publishPreview.data,
                        picture: action.src
                    }
                }
            }
        case pTypes.DISPLAY_PUBLISH_CONFIRM_MODAL:
            console.debug("reducer warned fucker")
            return {
                ...state,
                acceptedFBPublish: "ongoing",
                modalOpen: false
            }
        default:
            return state;
    }
};

export default participant;
