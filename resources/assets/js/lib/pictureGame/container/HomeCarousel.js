import {connect} from "react-redux";
import {
    getPhotoScope
} from "../actions/userActions";
import HomeCarouselComponent from "../ui/HomeCarousel";

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        startPlaying: () => {
            dispatch(getPhotoScope());
        }
    };
}

const HomeCarousel = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeCarouselComponent);

export default HomeCarousel;
