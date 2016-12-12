import React, {PropTypes as T} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Login from "../container/Login";

export default class AppNavBar extends React.PureComponent {
    render () {
        return (
            <AppBar
                title="Pardon Maman: the game"
                iconElementRight={<Login />}
            />
        )
    }
}
