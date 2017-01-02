import React, {PropTypes as T} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

import Login from "../container/Login";

const styles = {
  hide: {
    display: 'none'
  }
};

export default class AppNavBar extends React.PureComponent {
    render () {
        return (
            <AppBar
                title={this.props.title}
                style={styles.hide}
                iconElementRight={<Login />}
            />
        )
    }
}

AppNavBar.propTypes = {
    title: T.string.isRequired
}
