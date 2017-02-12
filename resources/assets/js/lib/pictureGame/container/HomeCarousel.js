import {connect} from "react-redux";
import {
    getPhotoScope,
    getCurrentPhotoPermissions,
    getFbAlbumCover,
    getFbAlbumPhotos,
    getFbAlbums,
    getMoreFbAlbumPhotos
} from "../actions/userActions";
import {
    getCurrentContest,
    changeMainColor
} from "../actions/contestActions";
import {
    addPhotoToCurrentContest,
    userNoticedRegistrationInContest,
    toggleConsultingPostedPhoto,
    toggleSubmitPhotoModal,
    cancelParticipation,
    noticedCancelNotice,
    getCurrentParticipant,
    displayFileUploadModal,
    getPublishPreviewData
} from "../actions/participantActions";
import {
  openNotice
} from "../actions/noticeActions";
import HomeCarouselComponent from "../ui/HomeCarousel";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getCurrentContest());
            dispatch(getCurrentParticipant());
            dispatch(getPublishPreviewData());
        },
        getFbAlbumPhotos: (album_id) => {
            dispatch(getFbAlbumPhotos(album_id))
        },
        loadMoreFbAlbumPhotos: (link, album_id) => {
            dispatch(getMoreFbAlbumPhotos(link, album_id))
        },
        proposePhotoForContest: (photo_id) => {
            dispatch(addPhotoToCurrentContest(photo_id));
            dispatch(openNotice());
        },
        userNoticedRegistrationInContest: () => {
            dispatch(userNoticedRegistrationInContest());
        },
        toggleConsultingPostedPhoto: () => {
            dispatch(toggleConsultingPostedPhoto());
        },
        cancelParticipation: () => {
            dispatch(cancelParticipation());
            dispatch(openNotice());
        },
        noticedCancelNotice: () => {
            dispatch(noticedCancelNotice());
        },
        displayFileUploadModal: () => {
            dispatch(displayFileUploadModal())
        },
        onChangeColor: (color) => {
            dispatch(changeMainColor(color));
        },
        toggleSubmitPhotoModal: () => {
            dispatch(toggleSubmitPhotoModal());
        },
        getFbAlbums: () => {
            dispatch(getFbAlbums())
        }
    };
}

const HomeCarousel = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCarouselComponent);

export default HomeCarousel;
