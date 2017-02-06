import {connect} from "react-redux";
import {
    leaveUploadDisardingChanges,
    previewImgUploaded,
    removePreviewImg,
    validPreviewImg,
    userNoticedRegistrationInContest,
    noticedUploadPhotoNotice,
    closeAllModals
} from "../actions/participantActions";
import {
  openNotice,
  closeNotice
} from "../actions/noticeActions";
import ParticipantUploadComponent from "../ui/ParticipantUpload";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        leaveUploadDisardingChanges: () => {
            dispatch(leaveUploadDisardingChanges())
        },
        previewImgUploaded: (source) => {
            dispatch(previewImgUploaded(source))
        },
        removePreviewImg: () => {
            dispatch(removePreviewImg())
        },
        validPreviewImg: (publicationMsg) => {
            dispatch(openNotice());
            dispatch(validPreviewImg(publicationMsg))
        },
        noticedUploadPhotoNotice: () => {
            dispatch(closeNotice());
            dispatch(noticedUploadPhotoNotice())
        },
        userNoticedRegistrationInContest: () => {
            dispatch(closeNotice());
            dispatch(userNoticedRegistrationInContest())
        },
        closeAllModals: () => {
            dispatch(closeAllModals());
        }
    };
}

const ParticipantUpload = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantUploadComponent);

export default ParticipantUpload;
