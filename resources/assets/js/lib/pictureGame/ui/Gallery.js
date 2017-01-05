import React, {PropTypes as T} from "react";
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Picture from "./Picture";

// import { GridList, GridTile } from "material-ui/GridList";

// <div>
//     <GridList
//         cellHeight={180}
//         cols={4}
//     >
//     {this.props.pictures.map((picture, index) => (
//         <GridTile
//             key={index}
//             title={picture.title}
//             subtitle={<span>par <b>{picture.author}</b></span>}
//             actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
//         >
//             <img src={picture.src} />
//         </GridTile>
//     ))}
//     </GridList>
// </div>

export default class Gallery extends React.PureComponent {
    constructor(){
        super();
    }

    render () {
        return (
            <div className="gridLayout">
                <div className="gridContainer container">
                    <div className="gridRow row">
                        {this.props.pictures.map((picture, index) => (
                        <div
                            className="gridItem"
                            key={index}
                        >
                            <div className="gridWell">
                                <img
                                    className="img-cover"
                                    src={picture.src}
                                />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

Gallery.propTypes = {
    pictures: T.arrayOf(
        T.shape({
            src: T.string.isRequired
        }).isRequired
    ).isRequired
};
