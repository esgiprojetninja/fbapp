import React, {PropTypes as T} from "react";

export default class Picture extends React.PureComponent {
    render () {
        return (
            <div>
                <p>{this.props.src}</p>
                <p>{this.props.author}</p>
                <p>{this.props.title}</p>
            </div>
        );
    }
}

Picture.propTypes = {
    src: T.string.isRequired
};
