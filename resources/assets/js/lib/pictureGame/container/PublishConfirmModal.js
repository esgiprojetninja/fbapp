import {connect} from "react-redux";
import PublishConfirmModalComponent from "../ui/PublishConfirmModal";
import {
    reloadCurrentParticipantAfterVote
} from "../actions/participantActions";


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

const PublishConfirmModal = connect(
    mapStateToProps,
    mapDispatchToProps
)(PublishConfirmModalComponent);

export default PublishConfirmModal;
