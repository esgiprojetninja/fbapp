import React, {PropTypes as T} from "react";

export default class CGUEditor extends React.PureComponent {
    componentWillMount () {
        this.props.onReady();
    }

    render () {
        return (
            <h1>CGU</h1>
        );
    }
}

CGUEditor.propTypes = {
    onReady: T.func.isRequired,
    legal: T.object.isRequired
};
