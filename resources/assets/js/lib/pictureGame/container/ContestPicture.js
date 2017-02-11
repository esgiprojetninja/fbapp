import {connect} from "react-redux";
import ContestPictureComponent from "../ui/ContestPicture";
// import {
//     changeMainColor
// } from "../actions/contestActions";
import {
    closePhoto,
    openPhoto
} from "../actions/galleryActions";


const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        voteFor: (id) => {
            console.log("coucou");
        },
        openImage: (participant_id) => {
            console.debug("here we are mofo");
            dispatch(openPhoto(participant_id))
        },
        closeImage: () => {
            dispatch(closePhoto())
        }
    };
}

const ContestPicture = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContestPictureComponent);

export default ContestPicture;
