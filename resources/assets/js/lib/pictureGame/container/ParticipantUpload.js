import {connect} from "react-redux";
import {
    leaveUploadDisardingChanges,
    previewImgUploaded,
    removePreviewImg,
    validPreviewImg
} from "../actions/participantActions";
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
        removePreviewImg: (source) => {
            dispatch(removePreviewImg(source))
        },
        validPreviewImg: (source) => {
            dispatch(validPreviewImg(source))
        }
    };
}

const ParticipantUpload = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantUploadComponent);

export default ParticipantUpload;
