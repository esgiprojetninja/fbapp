import {connect} from "react-redux";
import {
    getPhotoScope,
    getCurrentPhotoPermissions,
    getFbPhotos,
    resetPhotos
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
        getFbPhotos: (link) => {
            dispatch(getFbPhotos(link));
        },
        refreshPhotos: () => {
            dispatch(resetPhotos());
        }
    };
}

const HomeCarousel = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCarouselComponent);

export default HomeCarousel;
