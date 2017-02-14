import {connect} from "react-redux";

import HomeSliderUI from "../ui/HomeSlider";

import {
    getFbAlbums,
    getPhotoScope
} from "../actions/userActions";

import {
    toggleSubmitPhotoModal,
    toggleConsultingPostedPhoto,
    getPublishPreviewData
} from "../actions/participantActions";

const mapStateToProps = (state) => {
    return {
        participants: state.contest.currentContest.participants,
        contest: state.contest,
        user: state.user,
        currentParticipant: state.participant.currentParticipant
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSubmitPhotoModal: () => {
            dispatch(toggleSubmitPhotoModal());
        },
        toggleConsultingPostedPhoto: () => {
            dispatch(toggleConsultingPostedPhoto());
        },
        getFbAlbums: () => {
            dispatch(getFbAlbums())
        },
        startPlaying: () => {
            dispatch(getPhotoScope());
        },
        getPublishPreviewData: () => {
            dispatch(getPublishPreviewData());
        }
    };
}

const HomeSlider = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeSliderUI);

export default HomeSlider;
