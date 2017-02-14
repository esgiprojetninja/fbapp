import {connect} from "react-redux";
import PublishConfirmModalComponent from "../ui/PublishConfirmModal";
import {
    addPhotoToCurrentContest,
    confirmPublishPreview,
    refusePublishPreview
} from "../actions/participantActions";


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmPublishPreview: () => {
            dispatch(confirmPublishPreview());
        },
        refusePublishPreview: () => {
            dispatch(refusePublishPreview());
        },
        addPhotoToCurrentContest: (photo_id) => {
            console.debug("diaptching mother fucker", photo_id);
            dispatch(addPhotoToCurrentContest(photo_id));
        }
    };
}

const PublishConfirmModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishConfirmModalComponent);

export default PublishConfirmModal;
