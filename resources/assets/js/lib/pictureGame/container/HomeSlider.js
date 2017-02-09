import {connect} from "react-redux";

import HomeSliderUI from "../ui/HomeSlider";

const mapStateToProps = (state) => {
    return {
        participants: state.contest.currentContest.participants,
        contest: state.contest,
        user: state.user,
        currentParticipant: state.participant.currentParticipant 
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

const HomeSlider = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeSliderUI);

export default HomeSlider;
