import {connect} from "react-redux";
import {
    getCurrentContestVoters,
    cancelParticipation,
    closeModal
} from "../actions/voteActions";
import {
    openAdmin
} from "../actions/contestActions";
import CurrentContestVotesModalComponent from "../ui/CurrentContestVotesModal";

const mapStateToProps = (state) => {
    return {
        vote: state.vote,
        contest: state.contest
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCurrentContestVoters: () => {
            dispatch(getCurrentContestVoters())
        },
        cancelParticipation: (id_user) => {
            dispatch(cancelParticipation(id_user));
        },
        goBack: () => {
            dispatch(closeModal());
            dispatch(openAdmin());
        }
    }
}

const CurrentContestVotesModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentContestVotesModalComponent);

export default CurrentContestVotesModal;
