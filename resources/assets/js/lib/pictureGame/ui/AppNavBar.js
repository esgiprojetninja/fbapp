import React, {PropTypes as T} from "react";
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

import Login from "../container/Login";

const styles = {
    mediumIcon : {
        height: 30,
        width: 30
    },
    medium: {
        width: 42,
        height: 42,
        padding: "0 25px 0 0"
    }
};

export default class AppNavBar extends React.PureComponent {
    constructor(props){
        super(props);
        this.hide = false;
        this.myClass = 'navbar-mui navbar-mui-out';
        this.toggleNavbar = this.toggleNavbar.bind(this);
    }

    componentWillMount () {
        this.props.onReady();
    }

    toggleNavbar(){
        this.hide = !this.hide;
        this.hide ? this.myClass = 'navbar-mui' : this.myClass = 'navbar-mui navbar-mui-out';
        this.forceUpdate();
    }

    renderAppNavBar(){
        return (
            <AppBar
                style={{backgroundColor: this.props.uisettings.main_color}}
                className={this.myClass}
                title={this.props.title}
                showMenuIconButton={false}
                iconElementRight={<Login />}
            />
        )
    }

    renderToggledNavbar() {
        return (
            <div className='navbar-mui-wrapper'>
                {this.renderAppNavBar()}
                {this.renderToggleButton()}
            </div>
        );
    }

    renderNoToggleNavbar() {
        return (
            <AppBar
                style={{backgroundColor: this.props.uisettings.main_color}}
                className="navbar-mui"
                title={this.props.title}
                showMenuIconButton={false}
                iconElementRight={
                    <div>
                        <FlatButton
                            label="Accueil"
                            href="/"
                        />
                        <FlatButton
                            label="Règles du jeu"
                            href="#rules"
                        />
                        <FlatButton
                            label="CGU"
                            href="#cgu"
                        />
                        <FlatButton
                            label="Confidentialité"
                            href="#privacy"
                        />
                    </div>
                }
            />
        )
    }

    renderAdjustedNavbar () {
        if(this.props.noToggle){
            return this.renderNoToggleNavbar()
        }else{
            return this.renderToggledNavbar()
        }
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
        return this.renderAdjustedNavbar()
    }
}

AppNavBar.propTypes = {
    title: T.string.isRequired,
    buttons: T.arrayOf(T.object)
}
