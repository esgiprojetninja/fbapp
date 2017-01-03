import {connect} from "react-redux";
import {
    newContestChange,
    storeContest
} from "../actions/contestActions";
import ContestModalFormComponent from "../ui/ContestModalForm";

const mapStateToProps = (state) => {
    return state.contest;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateContestSubmit: (ev) => {
            ev.preventDefault();
            dispatch(storeContest());
        },
        onNewContestChange: (attr, value) => {
            dispatch(newContestChange(attr, value));
        }
    }
}

const ContestModalForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContestModalFormComponent);

export default ContestModalForm;
