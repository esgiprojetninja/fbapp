import {connect} from "react-redux";
import GalleryComponent from "../ui/Gallery";

const mapStateToProps = (state) => {
    if (!state.pictures) {
        return {
           pictures: [
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-1.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-5.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-4.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-3.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-1.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483549559-6.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-5.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-4.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-3.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483549559-6.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-5.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-4.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-3.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483549559-6.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-5.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-4.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-3.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
               },
               {
                   src: "http://image.noelshack.com/fichiers/2017/01/1483545909-2.jpg",
                   author: "Toto",
                   title: "Tatouage tribal"
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
