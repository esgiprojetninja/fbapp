import {connect} from "react-redux";
import GalleryComponent from "../ui/Gallery";
import {
    changeMainColor
} from "../actions/contestActions";


const mapStateToProps = (state) => {
    return {
        pictures: state.contest.currentContest.participants.map(p => {
            return {
                id: p.id,
                src: p.fb_source,
                nbVotes: p.nb_votes,
                picFbId: p.id_fb_photo,
                author: "Toto",
                caption: "Ceci est un tatouage tribal",
                title: "Photo"
            }
        }),
        contest: state.contest
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeColor: (color) => {
            dispatch(changeMainColor(color));
        },
        voteFor: (id) => {
            console.log("coucou");
        }
    };
}

const Gallery = connect(
    mapStateToProps,
    mapDispatchToProps
)(GalleryComponent);

export default Gallery;
