import React, {PropTypes as T} from "react";
import FlatButton from 'material-ui/FlatButton';

export default class Loginfb extends React.PureComponent {

    componentDidMount() {
        this.props.onReady(this.props.isConnected);
    }

    render() {
        return (
            <div>
                {this.renderTitle()}
                {this.renderButton()}
            </div>
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
                primary={true}
                onClick={(e) => this.props.onLoginClicked(this.props.isConnected)}
            />
        );
    }

    renderTitle() {
        if (this.props.isConnected) {
            return (<h1>{this.props.data.name}</h1>);
        }
        return (<h1>Please log in</h1>);
    }
}

Loginfb.propTypes = {
    onReady: T.func.isRequired,
    onLogoutClicked: T.func.isRequired,
    onLoginClicked: T.func.isRequired,
    isConnected: T.bool.isRequired,
    isFetching: T.bool.isRequired,
    data: T.shape({
        name: T.string,
        id: T.string
    })
};
