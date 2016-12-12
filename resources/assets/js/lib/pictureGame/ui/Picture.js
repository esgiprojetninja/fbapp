import React, {PropTypes as T} from "react";

export default class Picture extends React.PureComponent {
    render () {
        return (
            <div>
                <p>{this.props.url}</p>
                <p>{this.props.user}</p>
            </div>
        );
    }
}

Picture.propTypes = {
    url: T.string.isRequired,
    user: T.string.isRequired
};
