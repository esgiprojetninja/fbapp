import {connect} from "react-redux";
import {
    getPhotoScope,
    getCurrentPhotoPermissions,
    getFbAlbums,
    getFbAlbumCover,
    getFbAlbumPhotos,
    getMoreFbAlbumPhotos
} from "../actions/userActions";
import {
    getCurrentContest
} from "../actions/contestActions";
import {
    toggleSubmitPhotoModal,
    addPhotoToCurrentContest,
    userNoticedRegistrationInContest,
    toggleConsultingPostedPhoto,
    cancelParticipation,
    noticedCancelNotice,
    getCurrentParticipant
} from "../actions/participantActions";
import HomeCarouselComponent from "../ui/HomeCarousel";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getCurrentContest());
            dispatch(getCurrentParticipant());
        },
        startPlaying: () => {
            dispatch(getPhotoScope());
        },
        toggleSubmitPhotoModal: () => {
            dispatch(toggleSubmitPhotoModal());
        },
        getFbAlbums: () => {
            dispatch(getFbAlbums())
        },
        getFbAlbumPhotos: (album_id) => {
            dispatch(getFbAlbumPhotos(album_id))
        },
        loadMoreFbAlbumPhotos: (link, album_id) => {
            dispatch(getMoreFbAlbumPhotos(link, album_id))
        },
        proposePhotoForContest: (photo_id) => {
            dispatch(addPhotoToCurrentContest(photo_id))
        },
        userNoticedRegistrationInContest: () => {
            dispatch(userNoticedRegistrationInContest());
        },
        toggleConsultingPostedPhoto: () => {
            dispatch(toggleConsultingPostedPhoto());
        },
        cancelParticipation: () => {
            dispatch(cancelParticipation())
        },
        noticedCancelNotice: () => {
            dispatch(noticedCancelNotice())
        }
    };
}

const HomeCarousel = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCarouselComponent);

export default HomeCarousel;
