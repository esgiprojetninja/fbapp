import {connect} from "react-redux";
import {
    getPhotoScope,
    getCurrentPhotoPermissions,
    getFbPhotos
} from "../actions/userActions";
import {
    getCurrentContest
} from "../actions/contestActions";
import {
    toggleSubmitPhotoModal
} from "../actions/participantActions";
import HomeCarouselComponent from "../ui/HomeCarousel";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getCurrentContest());
        },
        startPlaying: () => {
            dispatch(getPhotoScope());
        },
        toggleSubmitPhotoModal: () => {
            dispatch(toggleSubmitPhotoModal());
        },
        getFbPhotos: () => {
            dispatch(getFbPhotos());
        }
    };
}

const HomeCarousel = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCarouselComponent);

export default HomeCarousel;
