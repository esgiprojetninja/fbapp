import React, {PropTypes as T, Component} from "react";
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Picture from "./Picture";
import Lightbox from 'react-image-lightbox';

export default class Gallery extends React.PureComponent {
    constructor(props) {
       super(props);

       this.state = {
           photoIndex: 0,
           isOpen: false
       };
    }

    renderGridImages () {
        const {
            photoIndex,
            isOpen,
        } = this.state;

        return (
            <div className="gridLayout">
                <div className="gridRow">
                    {this.props.pictures.map((picture, index) => (
                    <div
                        className="gridItem"
                        key={index}
                        onClick={() => this.setState({ isOpen: true, photoIndex: index})}
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
        )
    }

    renderLightBox () {
        const {
            photoIndex,
            isOpen,
        } = this.state;

        return (
            <div>
               {isOpen &&
                   <Lightbox
                       mainSrc={this.props.pictures[photoIndex].src}
                       nextSrc={this.props.pictures[(photoIndex + 1) % this.props.pictures.length].src}
                       prevSrc={this.props.pictures[(photoIndex + this.props.pictures.length - 1) % this.props.pictures.length].src}
                       onCloseRequest={() => this.setState({ isOpen: false })}
                       onMovePrevRequest={() => this.setState({
                           photoIndex: (photoIndex + this.props.pictures.length - 1) % this.props.pictures.length,
                       })}
                       onMoveNextRequest={() => this.setState({
                           photoIndex: (photoIndex + 1) % this.props.pictures.length,
                       })}
                   />
               }
           </div>
        )
    }

    render () {
        return (
            <div>
                {this.renderGridImages()}
                {this.renderLightBox()}
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
