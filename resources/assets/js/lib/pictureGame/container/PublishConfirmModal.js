import {connect} from "react-redux";
import PublishConfirmModalComponent from "../ui/PublishConfirmModal";
import {
    addPhotoToCurrentContest,
    confirmPublishPreview,
    refusePublishPreview,
    cancelPreview,
    validPreviewImg
} from "../actions/participantActions";
import {
  openNotice
} from "../actions/noticeActions";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelPreview: () => {
            dispatch(cancelPreview());
        },
        validPreviewUploadImg: (publicationMsg) => {
            dispatch(validPreviewImg(publicationMsg))
            dispatch(openNotice());
        },
        confirmPublishPreview: () => {
            dispatch(confirmPublishPreview());
        },
        refusePublishPreview: () => {
            dispatch(refusePublishPreview());
        },
        addPhotoToCurrentContest: (photo_id) => {
            dispatch(addPhotoToCurrentContest(photo_id));
            dispatch(openNotice())
        }
    };
}

const PublishConfirmModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishConfirmModalComponent);

export default PublishConfirmModal;
