import {connect} from "react-redux";
import GalleryComponent from "../ui/Gallery";
import {
    changeMainColor
} from "../actions/contestActions";

const mapStateToProps = (state) => {
    if (!state.pictures) {
        return {
           pictures: [
               {
                   src: "https://image.noelshack.com/fichiers/2017/01/1483545909-1.jpg",
                   author: "Toto",
                   caption: "Ceci est un tatouage tribal",
                   caption: "Ceci est un tatouage tribal",
                   title: "Tatouage tribal"
               },
               {
                   src: "https://image.noelshack.com/fichiers/2017/01/1483545909-5.jpg",
                   author: "Toto",
                   caption: "Ceci est un tatouage tribal",
                   title: "Tatouage tribal"
               },
           ],
           contest: state.contest
       }
    }
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeColor: (color) => {
            dispatch(changeMainColor(color));
        }
    };
}

const Gallery = connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryComponent);

export default Gallery;
