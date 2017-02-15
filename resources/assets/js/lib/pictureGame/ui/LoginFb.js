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
                    label="accueil"
                    href="/"
                />
                {this.renderAdminButton()}
                {this.renderLoginButton()}
                {this.renderHelpButton()}
            </div>
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
                label="Se déconnecter"
                secondary={true}
                className={className}
                onClick={(e) => this.props.onLogoutClicked(this.props.isConnected)}
                />
            );
        }
        return (
            <FlatButton
            label="Se connecter"
            className={className}
            onClick={(e) => this.props.onLoginClicked(this.props.isConnected)}
            />
        );
    }

    renderHelpButton () {
        return (
            <FlatButton
                style={{marginTop: "-2px"}}
                label="Aide"
                secondary={true}
                href="help"
            />
        );
    }

    renderShareButton () {
        return (
            <div
                className="fb-share-button"
                data-href="http://esgi.ninja/"
                data-layout="button_count"
                data-size="small"
                data-mobile-iframe="true"
            >
            </div>
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
