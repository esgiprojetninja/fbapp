import React, {PropTypes as T} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

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
    constructor(props){
        super(props);
        this.hide = false;
        this.myClass = 'navbar-mui navbar-mui-out';
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    toggleNavbar(){
        this.hide = !this.hide;
        this.hide ? this.myClass = 'navbar-mui' : this.myClass = 'navbar-mui navbar-mui-out';
        this.forceUpdate();
    }

    renderAppNavBar(){
        return (
            <AppBar
                style={{backgroundColor: this.props.color}}
                className={this.myClass}
                title={this.props.title}
                showMenuIconButton={false}
                iconElementRight={<Login />}
            />
        )
    }

    renderToggleButton(){
        return (
            <div className="navbar-mui-open-wrapper">
                <IconButton
                    iconStyle={styles.mediumIcon}
                    style={styles.medium}
                    onClick={this.toggleNavbar}
                >
                    <MenuIcon color="white"/>
                </IconButton>
            </div>
        )
    }

    render () {
        return (
            <div className='navbar-mui-wrapper'>
                {this.renderAppNavBar()}
                {this.renderToggleButton()}
            </div>
        )
    }
}

AppNavBar.propTypes = {
    title: T.string.isRequired
}
