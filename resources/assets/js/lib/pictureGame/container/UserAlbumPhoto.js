import {connect} from "react-redux";
import UserAlbumPhotoComponent from "../ui/UserAlbumPhoto";
import {
    changePublishPreviewSrcImage,
    displayModalPublishPreview
} from "../actions/participantActions";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePublishPreviewSrcImage: (src, photo_id) => {
            dispatch(changePublishPreviewSrcImage(src, photo_id));
        },
        displayModalPublishPreview: () => {
            dispatch(displayModalPublishPreview())
        }
    }
}

const UserAlbumPhoto = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAlbumPhotoComponent);

export default UserAlbumPhoto;
