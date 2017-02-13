import {connect} from "react-redux";
import ContestPictureComponent from "../ui/ContestPicture";
import {
    closePhoto,
    openPhoto,
    voteForDisplaidPhoto,
    voteSuccessNoticed,
    noticedVoteErrorMsg
} from "../actions/galleryActions";
import {
    reloadCurrentParticipantAfterVote
} from "../actions/participantActions";
import {
    reloadContestParticipantAfterVote
} from "../actions/contestActions";

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
        },
        voteSuccessNoticed: () => {
            dispatch(reloadContestParticipantAfterVote());
            dispatch(reloadCurrentParticipantAfterVote());
            dispatch(voteSuccessNoticed());
        },
        noticedVoteErrorMsg: () => {
            dispatch(noticedVoteErrorMsg());
        }
    };
}

const ContestPicture = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContestPictureComponent);

export default ContestPicture;
