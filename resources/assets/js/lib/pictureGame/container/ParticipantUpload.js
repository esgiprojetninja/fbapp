import {connect} from "react-redux";
import {
    leaveUploadDisardingChanges,
    previewImgUploaded,
    removePreviewImg,
    userNoticedRegistrationInContest,
    noticedUploadPhotoNotice,
    changePublishPreviewSrcImage,
    closeAllModals,
    displayModalPublishPreview
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
        },
        changePublishPreviewSrcImage: (src, publicationMsg) => {
            dispatch(openNotice());
            dispatch(changePublishPreviewSrcImage(src, false, publicationMsg));
        },
        displayModalPublishPreview: () => {
            dispatch(displayModalPublishPreview("fileUploadModal"))
        }
    };
}

const ParticipantUpload = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantUploadComponent);

export default ParticipantUpload;
