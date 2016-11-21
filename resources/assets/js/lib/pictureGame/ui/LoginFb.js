import React, {PropTypes as T} from "react";
import FlatButton from 'material-ui/FlatButton';

export default class Loginfb extends React.PureComponent {
    componentDidMount() {
        this.props.onReady(this.props.isConnected);
    }

    render() {
        return (
            <FlatButton
                label="Connect to facebook"
                primary={true}
                //onClick={this.props.onLoginClicked}
            />
        );
    }
}

Loginfb.propTypes = {
    onReady: T.func.isRequired,
    user: T.shape({
        isConnected: T.bool.isRequired,
        isFetching: T.bool.isRequired,
        data: T.shape()
    }).isRequired
};
