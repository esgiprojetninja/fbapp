import {connect} from "react-redux";
import {
    getContests,
    toggleCreateModal,
    newContestChange,
    createContest
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
        onCreateContestSubmit: (ev) => {
            ev.preventDefault();
            dispatch(createContest());
        },
        onCreateModalOpenClick: () => {
            dispatch(toggleCreateModal());
        },
        onNewContestChange: (attr, value) => {
            dispatch(newContestChange(attr, value))
        }
    }
}

const AdminContests = connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminContestsComponent);

export default AdminContests;
