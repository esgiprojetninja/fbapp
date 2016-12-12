import {connect} from "react-redux";
import GalleryComponent from "../ui/Gallery";

const mapStateToProps = (state) => {
    if (!state.pictures) {
        return {
           pictures: [
               {
                   url: "http://toto.com",
                   user: "toto"
               },
               {
                   url: "http://tutu.com",
                   user: "tutu"
               }
           ]
       }
    }
    return state.pictures;
}

const mapDispatchToProps = (dispatch) => {
    return {

    };
}

const Gallery = connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryComponent);

export default Gallery;
