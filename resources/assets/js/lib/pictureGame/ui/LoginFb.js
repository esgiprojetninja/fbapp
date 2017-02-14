import React, {PropTypes as T} from "react";
import FlatButton from 'material-ui/FlatButton';
import Admin from "./Admin";

export default class Loginfb extends React.PureComponent {

    componentDidMount() {
        this.props.onReady(this.props.isConnected);
    }

    render() {
        return (
            <div className="navbar-mui-right">
                <FlatButton
                    label="Home"
                    href="/"
                />
                {this.renderAdminButton()}
                {this.renderArchivesButton()}
                {this.renderLoginButton()}
                {this.renderHelpButton()}
            </div>
        );
    }
    renderArchivesButton () {
        return (
            <FlatButton
                label="Archives"
                secondary={true}
            />
        );
    }

    renderAdminButton () {
        if (this.props.isAdmin) {
            return (
                <Admin className="initial"/>
            );
        }
    }

    renderLoginButton() {
        const className = "login-btn";
        if (this.props.isConnected) {
            return (
                <FlatButton
                label="Logout"
                secondary={true}
                className={className}
                onClick={(e) => this.props.onLogoutClicked(this.props.isConnected)}
                />
            );
        }
        return (
            <FlatButton
            label="Connect with facebook"
            className={className}
            onClick={(e) => this.props.onLoginClicked(this.props.isConnected)}
            />
        );
    }

    renderHelpButton () {
        return (
            <FlatButton
                style={{marginTop: "-2px"}}
                label="aide"
                secondary={true}
                href="conf-politics"
            />
        );
    }
}

Loginfb.propTypes = {
    onReady: T.func.isRequired,
    onLogoutClicked: T.func.isRequired,
    onLoginClicked: T.func.isRequired,
    onJoinClicked: T.func.isRequired,
    isConnected: T.bool.isRequired,
    isFetching: T.bool.isRequired,
    data: T.shape({
        email: T.string,
        id: T.number
    })
};
