import {connect} from "react-redux";
import {
    getContests,
    toggleCreateModal,
    deleteContest,
    activateContest
} from "../actions/contestActions";
import AdminContestsComponent from "../ui/AdminContests";

const mapStateToProps = (state) => {
    return state.contest;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getContests());
        },
        onCreateModalOpenClick: (ev, contest) => {
            dispatch(toggleCreateModal(contest));
        },
        onDeleteContestClick: (id) => {
            dispatch(deleteContest(id));
        },
        onActivateContestClick: (id) => {
            dispatch(activateContest(id));
        }
    }
}

const AdminContests = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContestsComponent);

export default AdminContests;
