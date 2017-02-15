import {connect} from "react-redux";
import {
    getCurrentContestVoters
} from "../actions/voteActions";
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
        }
    }
}

const CurrentContestVotesModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentContestVotesModalComponent);

export default CurrentContestVotesModal;
