import React, {PropTypes as T} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'

import Login from "../container/Login";

const styles = {
    mediumIcon : {
    height: 48,
    width: 48
    },
    medium: {
        width: 80,
        height: 65,
        padding: 10
    }
};

export default class AppNavBar extends React.PureComponent {
    constructor(){
        super();
        this.hide = false;
        this.myClass = 'navbar-mui navbar-mui-out';
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(){
        this.hide = !this.hide;
        this.hide ? this.myClass = 'navbar-mui' : this.myClass = 'navbar-mui navbar-mui-out';
        console.log(this.hide);
        console.log(this.myClass);
        this.forceUpdate();
    }

    render () {
        return (
            <div className='navbar-mui-wrapper'>
                <AppBar
                    className={this.myClass}
                    title={this.props.title}
                    iconElementRight={<Login />}
                />
                <div className="navbar-mui-open-wrapper">
                    <IconButton
                        iconStyle={styles.mediumIcon}
                        style={styles.medium}
                        onClick={this.toggleNavbar}
                    >
                        <MenuIcon color="white"/>
                    </IconButton>
                </div>
            </div>
        )
    }
}

AppNavBar.propTypes = {
    title: T.string.isRequired
}
