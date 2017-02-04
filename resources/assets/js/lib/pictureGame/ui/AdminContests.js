import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import ContestModalForm from "../container/ContestModalForm";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import AutoComplete from 'material-ui/AutoComplete';
import Search from 'material-ui/svg-icons/action/search'

import {List, ListItem} from 'material-ui/List';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { SketchPicker } from 'react-color';
import Toggle from 'material-ui/Toggle';

const style = {
    actionsBtn : {
        margin: "0 2px"
    },
    modal : {
        width: "85%",
        maxWidth: "none"
    },
    adminCustom : {
        display: "block",
        margin: "15px 0"
    },
    fullSreenToggle : {
        fontWeight: "200",
        textTransform: "uppercase",
        fontSize: "14px"
    }
}

const colors = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Black',
    'White',
];

const appColors = {
    default : [
        '#00E0FE',
        "#CD2431"
    ]
}

export default class AdminContests extends React.PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            open : false,
            openEvents: true,
            openSettings: false,
            settingsMenu: true,
            settingsTheme: false,
            settingsCarousel: false,
            settingsGallery: false,
            settingsSubmenu: false,
            background: appColors.default[0]
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openEvents = this.openEvents.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.openSettingsMenu = this.openSettingsMenu.bind(this);
        this.openSettingsTheme = this.openSettingsTheme.bind(this);
        this.openSettingsGallery = this.openSettingsGallery.bind(this);
        this.openSettingsCarousel = this.openSettingsCarousel.bind(this);
        this.openSettingsSubmenu = this.openSettingsSubmenu.bind(this);
    }

    handleChangeComplete(color) {
        this.setState({ background: color.hex });
    }

    openSettingsMenu() {
        this.setState({
            settingsMenu: true,
            settingsTheme: false,
            settingsCarousel: false,
            settingsGallery: false,
            settingsSubmenu: false
         });
    }

    openSettingsTheme() {
        this.setState({
            settingsMenu: false,
            settingsTheme: true,
            settingsCarousel: false,
            settingsGallery: false,
            settingsSubmenu: false
         });
    }

    openSettingsSubmenu() {
        this.setState({
            settingsMenu: false,
            settingsTheme: false,
            settingsCarousel: false,
            settingsGallery: false,
            settingsSubmenu: true
         });
    }

    openSettingsGallery() {
        this.setState({
            settingsMenu: false,
            settingsTheme: false,
            settingsCarousel: false,
            settingsGallery: true,
            settingsSubmenu: false
         });
    }

    openSettingsCarousel() {
        this.setState({
            settingsMenu: false,
            settingsTheme: false,
            settingsCarousel: true,
            settingsGallery: false,
            settingsSubmenu: false
         });
    }

    openSettings() {
        this.setState({
            openEvents: false,
            openSettings: true,
            settingsMenu: true,
            settingsCarousel: false,
            settingsGallery: false,
            settingsSubmenu: false,
            settingsTheme: false
        });
    }

    openEvents() {
        this.setState({openEvents: true, openSettings: false});
    }

    handleOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    componentWillMount () {
        this.props.onReady();
    }

    addIfInferior(num) {
        return (parseInt(num) < 10) ? "0"+num : num
    }
    uiDateFormater(d) {
        return this.addIfInferior(d.getDate()) + "/" + this.addIfInferior(parseInt(d.getMonth())+1) + "/" + d.getFullYear()
    }

    renderSpinner () {
        const style = {
            container: {
                position: "relative",
                width: "40px",
                margin: "0 auto"
            },
            refresh: {
                display: "inline-block",
                position: "relative",
            },
        };
        return (
            <div style={style.container}>
                <RefreshIndicator
                    size={40}
                    left={10}
                    top={40}
                    status="loading"
                    style={style.refresh}
                />
            </div>
        );
    }

    renderContent () {
        if (this.props.isFetching) {
            return this.renderSpinner()
        } else {
            return this.renderTable()
        }
    }

    renderAdminSideBar () {
        return  (
            <div>
                <div style={{marginTop: "15px"}}>
                    <div className="admin-profil img-circle">
                        <img className="img-cover" src="profil.jpg"/>
                    </div>
                    <span className="admin-profil-name">Teddy Meksavanh</span>
                </div>

                <div>
                    <List>
                        <ListItem
                            style={{padding: "0 15px"}}
                            primaryText="Concours"
                            secondaryText="Voir les concours"
                            onClick={this.openEvents}
                        />
                        <ListItem
                            style={{padding: "0 15px"}}
                            primaryText="Paramètres"
                            secondaryText="Design de l'application"
                            onClick={this.openSettings}
                        />
                    </List>
                </div>

            </div>
        )
    }

    renderTable () {
        return (
            <div>
                <div className="admin-table-bar">
                    <RaisedButton
                        label="Create a new contest"
                        onTouchTap={this.props.onCreateModalOpenClick}
                        className="admin-create"
                    />
                </div>
                <Table bodyStyle={{overflow: 'visible'}} className="admin-table">
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Title</TableHeaderColumn>
                            <TableHeaderColumn>From</TableHeaderColumn>
                            <TableHeaderColumn>To</TableHeaderColumn>
                            <TableHeaderColumn>Winner</TableHeaderColumn>
                            <TableHeaderColumn>Active</TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.renderRows()}
                    </TableBody>
                </Table>
            </div>
        );
    }

    renderRows () {
        return this.props.contests.map(contest => (
            <TableRow key={contest.id}>
                <TableRowColumn className="admin-td admin-td-id">{contest.id}</TableRowColumn>
                <TableRowColumn className="admin-td admin-td-title">{contest.title}</TableRowColumn>
                <TableRowColumn className="admin-td admin-td-start">{this.uiDateFormater(new Date(contest.start_date))}</TableRowColumn>
                <TableRowColumn className="admin-td admin-td-end">{this.uiDateFormater(new Date(contest.end_date))}</TableRowColumn>
                <TableRowColumn className="admin-td admin-td-winner">{contest.id_winner}</TableRowColumn>
                <TableRowColumn className="admin-td admin-td-state">{contest.state}</TableRowColumn>
                <TableRowColumn className="admin-td-eventsBtn">
                <div>
                    <RaisedButton
                    style={style.actionsBtn}
                    label="Edit"
                    primary={true}
                    data-contest={contest}
                    onTouchTap={(ev) => {
                      this.props.onCreateModalOpenClick(ev, contest);
                    }}
                    />
                    <RaisedButton
                    style={style.actionsBtn}
                    label="Delete"
                    secondary={true}
                    onTouchTap={() => {
                      this.props.onDeleteContestClick(contest.id);
                    }}
                    />
                    <RaisedButton
                    style={style.actionsBtn}
                    label="Activate"
                    backgroundColor = "#e4e3e3"
                    onTouchTap={() => {
                      this.props.onActivateContestClick(contest.id);
                    }}
                    />
                </div>
                </TableRowColumn>
            </TableRow>
        ));
    }

    renderParams () {
        return (
            <div>
                <div className="col-md-6">
                </div>

                <div className="col-md-6">
                    {this.renderAdminCustomize()}
                </div>
            </div>
        );
    }

    renderAdminCustomize() {
        if(this.state.settingsMenu){
            return this.renderSettingsMenu()
        }
        if(this.state.settingsTheme){
            return this.renderSettingsTheme()
        }
        if(this.state.settingsCarousel){
            return this.renderSettingsCarousel()
        }
        if(this.state.settingsSubmenu){
            return this.renderSettingsSubmenu()
        }
        if(this.state.settingsGallery){
            return this.renderSettingsGallery()
        }
    }

    renderSettingsMenu() {
        return (
            <div className="full-width">
                <RaisedButton onClick={this.openSettingsTheme} label="Thème" style={style.adminCustom}/>
                <RaisedButton onClick={this.openSettingsCarousel} label="Carousel" style={style.adminCustom}/>
                <RaisedButton onClick={this.openSettingsGallery} label="Gallerie" style={style.adminCustom}/>
                <RaisedButton onClick={this.openSettingsSubmenu} label="Sous-menu" style={style.adminCustom}/>
                <Toggle label="Fullscreen" labelStyle={style.fullSreenToggle}/>
                <Toggle label="Default" labelStyle={style.fullSreenToggle}/>
            </div>
        );
    }

    renderSettingsTheme() {
        return (
            <div className="full-width">
                <RaisedButton onClick={this.openSettingsMenu} label="Retour" style={style.adminCustom}/>
                <span>theme</span>
            </div>
        );
    }

    renderSettingsCarousel() {
        return (
            <div>
                <RaisedButton onClick={this.openSettingsMenu} label="Retour"/>
                <span>carousel</span>
            </div>
        );
    }

    renderSettingsSubmenu() {
        return (
            <div>
                <RaisedButton onClick={this.openSettingsMenu} label="Retour"/>
                <span>submenu</span>
            </div>
        );
    }

    renderSettingsGallery() {
        return (
            <div>
                <RaisedButton onClick={this.openSettingsMenu} label="Retour"/>
                <span>gallery</span>
            </div>
        );
    }

    renderAdminBody () {
        if(this.state.openEvents){
            return (
                <div className="col-md-9" style={{alignSelf: "flex-start"}}>
                    <div>
                        {this.renderContent()}
                        <ContestModalForm
                        handleClose={this.props.onCreateModalOpenClick}
                        open={this.props.createModalOpen}
                        />
                    </div>
                </div>
            );
        }
        if(this.state.openSettings){
            return (
                <div className="col-md-9">
                    <div>
                        {this.renderParams()}
                    </div>
                </div>
            );
        }
    }

    render () {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleClose}
          />,
        ];


        return (
            <div className="admin initial">
                <div className="initial">
                    <FlatButton
                        label="Admin"
                        onTouchTap={this.handleOpen}
                    />
                    <Dialog
                      title="Admin"
                      bodyClassName="admin-body"
                      modal={false}
                      open={this.state.open}
                      contentStyle={style.modal}
                      onRequestClose={this.handleClose}
                      autoScrollBodyContent={true}
                    >
                        <div className="vertical-align">
                            <div className="col-md-3 admin-sidebar">
                                {this.renderAdminSideBar()}
                            </div>
                            {this.renderAdminBody()}
                        </div>
                    </Dialog>
                </div>

            </div>
        );
    }
}

AdminContests.propTypes = {
    contests: T.arrayOf(
        T.shape().isRequired
    ).isRequired,
    onReady: T.func.isRequired,
    onCreateModalOpenClick: T.func.isRequired
};
