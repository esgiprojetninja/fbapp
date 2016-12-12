import React, {PropTypes as T} from "react";
import FlatButton from 'material-ui/FlatButton';

export default class Loginfb extends React.PureComponent {

    componentDidMount() {
        this.props.onReady(this.props.isConnected);
    }

    render() {
        return (
            this.renderButton()
        );
    }

    renderButton() {
        if (this.props.isConnected) {
            return (
                <FlatButton
                    label="Logout"
                    secondary={true}
                    onClick={(e) => this.props.onLogoutClicked(this.props.isConnected)}
                />
            );
        }
        return (
            <FlatButton
                label="Connect with facebook"
                onClick={(e) => this.props.onLoginClicked(this.props.isConnected)}
            />
        );
    }
}

Loginfb.propTypes = {
    onReady: T.func.isRequired,
    onLogoutClicked: T.func.isRequired,
    onLoginClicked: T.func.isRequired,
    isConnected: T.bool.isRequired,
    isFetching: T.bool.isRequired,
    data: T.shape({
        email: T.string,
        id: T.number
    })
};
