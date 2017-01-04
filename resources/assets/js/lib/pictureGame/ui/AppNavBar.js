import React, {PropTypes as T} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import ViewModule from 'material-ui/svg-icons/action/view-module'

import Login from "../container/Login";

const styles = {
    mediumIcon : {
    height: 48,
    width: 48
    },
    largeIcon: {
        width: 52,
        height: 52
    },
    medium: {
        width: 96,
        height: 96,
        padding: 15
    },
    large: {
        width: 104,
        height: 104,
        padding: 20
    }
};

export default class AppNavBar extends React.PureComponent {
    render () {
        return (
            <div className="navbar-mui-wrapper">
                <div className="navbar-mui-open-wrapper">
                    <IconButton
                    iconStyle={styles.largeIcon}
                    style={styles.large}
                    >
                    <ViewModule color="white"/>
                    </IconButton>
                </div>
                <AppBar
                    className="navbar-mui"
                    title={this.props.title}
                    iconElementRight={<Login />}
                />
            </div>
        )
    }
}

AppNavBar.propTypes = {
    title: T.string.isRequired
}
