import {connect} from "react-redux";
import {
    getContests,
    toggleCreateModal
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
        }
    }
}

const AdminContests = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContestsComponent);

export default AdminContests;
