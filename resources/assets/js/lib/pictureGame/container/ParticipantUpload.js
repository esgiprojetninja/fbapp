import {connect} from "react-redux";
import {
    leaveUploadDisardingChanges,
    uploadedImgFile
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
        uploadedImgFile: (source) => {
            dispatch(uploadedImgFile(source))
        }
    };
}

const ParticipantUpload = connect(
    mapStateToProps,
    mapDispatchToProps
)(ParticipantUploadComponent);

export default ParticipantUpload;
