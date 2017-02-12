import {connect} from "react-redux";
import UserAlbumPhotoComponent from "../ui/UserAlbumPhoto";
import {
    changePublishPreviewSrcImage
} from "../actions/participantActions";

const mapStateToProps = (state) => {
    return state.participant;
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePublishPreviewSrcImage: (src) => {
            dispatch(changePublishPreviewSrcImage(src));
        }
    }
}

const UserAlbumPhoto = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserAlbumPhotoComponent);

export default UserAlbumPhoto;
