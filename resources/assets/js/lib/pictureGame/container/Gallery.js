import {connect} from "react-redux";
import GalleryComponent from "../ui/Gallery";

import {
    closePhoto,
    openPhoto
} from "../actions/galleryActions";


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        openImage: (participant_id) => {
            dispatch(openPhoto(participant_id))
        }
    };
}

const Gallery = connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryComponent);

export default Gallery;
