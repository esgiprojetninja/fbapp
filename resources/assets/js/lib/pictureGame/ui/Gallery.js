import React, {PropTypes as T} from "react";
import Picture from "./Picture";


export default class Gallery extends React.PureComponent {
    render () {
        return (
            <div>
                {this.props.pictures.map((picture, index) => (
                    <Picture url={picture.url} user={picture.user} key={index} />
                ))}
            </div>
        )
    }

    renderPictures () {
        return this.props.pictures.map(picture => {
            this.renderPicture(picture);
        });
    }

    renderPicture (picture) {
        return <Picture url={picture.url} user={picture.user} />;
    }
}

Gallery.propTypes = {
    pictures: T.arrayOf(
        T.shape({
            url: T.string.isRequired,
            user: T.string.isRequired
        }).isRequired
    ).isRequired
};
