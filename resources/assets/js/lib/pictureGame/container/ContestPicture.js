import {connect} from "react-redux";
import ContestPictureComponent from "../ui/ContestPicture";
import {
    closePhoto,
    openPhoto
} from "../actions/galleryActions";
import {
    voteForDisplaidPhoto
} from "../actions/participantActions";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteForDisplaidPic: () => {
            dispatch(closePhoto());
            dispatch(voteForDisplaidPhoto());
        },
        openImage: (participant_id) => {
            dispatch(openPhoto(participant_id));
        },
        closeImage: () => {
            dispatch(closePhoto());
        }
    };
}

const ContestPicture = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContestPictureComponent);

export default ContestPicture;
