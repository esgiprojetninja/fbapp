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
    },
    mockupActive: {
        fillOpacity: "0",
        fill: "#00E0FE",
        stroke: "#00E0FE"
    },
    mockupDefault: {
        fillOpacity: "0",
        fill: "#777",
        stroke: "#777"
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
            background: appColors.default[0],
            adminPreview: "https://image.noelshack.com/fichiers/2017/05/1486252110-xd.png",
            hoverSettingsTheme: false,
            hoverSettingsCarousel: false,
            hoverSettingsGallery: false,
            hoverSettingsSubmenu: false
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
        this.hoverCarousel = this.hoverCarousel.bind(this);
        this.hoverTheme = this.hoverTheme.bind(this);
        this.hoverSubmenu = this.hoverSubmenu.bind(this);
        this.hoverGallery = this.hoverGallery.bind(this);
        this.hoverReset = this.hoverReset.bind(this);
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

    hoverCarousel() {
        this.setState({
            hoverSettingsCarousel: true,
            hoverSettingsTheme: false,
            hoverSettingsSubmenu: false,
            hoverSettingsGallery: false
        });
    }

    hoverTheme() {
        this.setState({
            hoverSettingsCarousel: false,
            hoverSettingsTheme: true,
            hoverSettingsSubmenu: false,
            hoverSettingsGallery: false
        });
    }

    hoverGallery() {
        this.setState({
            hoverSettingsCarousel: false,
            hoverSettingsTheme: false,
            hoverSettingsSubmenu: false,
            hoverSettingsGallery: true
        });
    }

    hoverSubmenu() {
        this.setState({
            hoverSettingsCarousel: false,
            hoverSettingsTheme: false,
            hoverSettingsSubmenu: true,
            hoverSettingsGallery: false
        });
    }

    hoverReset() {
        this.setState({
            hoverSettingsCarousel: false,
            hoverSettingsTheme: false,
            hoverSettingsSubmenu: false,
            hoverSettingsGallery: false
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
            <div className="vertical-align">
                <div className="col-md-6">
                    <div>
                        {this.renderAdminPreview()}
                    </div>
                </div>

                <div className="col-md-6" style={{position: "initial"}}>
                    {this.renderParamsWithBackButton()}
                </div>
            </div>
        );
    }

    renderAdminPreview() {
        return (
            <div className="text-center">
                <svg className="svg-canvas">
                    <path
                        style={this.state.hoverSettingsCarousel ? style.mockupActive : style.mockupDefault}
                        d="m 7.18154,2.5565474 h 195.79167 c 2.68079,0 4.83897,2.1279841 4.83897,4.7712648 V 99.082901 c 0,2.643279 -2.15818,4.771269 -4.83897,4.771269 H 7.18154 c -2.6807828,0 -4.838958,-2.12799 -4.838958,-4.771269 V 7.3278122 c 0,-2.6432807 2.1581752,-4.7712648 4.838958,-4.7712648 z"
                    />
                    <path
                        style={this.state.hoverSettingsSubmenu ? style.mockupActive : style.mockupDefault}
                        d="M 7.7105232,106.72142 H 202.96087 c 2.66829,0 4.81641,2.1915 4.81641,4.91368 v 17.76491 c 0,2.72218 -2.14812,4.91368 -4.81641,4.91368 H 7.7105232 c -2.6682936,0 -4.8164146,-2.1915 -4.8164146,-4.91368 V 111.6351 c 0,-2.72218 2.148121,-4.91368 4.8164146,-4.91368 z"
                    />
                    <path
                        style={this.state.hoverSettingsGallery ? style.mockupActive : style.mockupDefault}
                        d="M 8.2272747,137.64409 H 203.0208 c 2.66204,0 4.80514,2.10356 4.80514,4.71649 v 143.67155 c 0,2.61293 -2.1431,4.71648 -4.80514,4.71648 H 8.2272747 c -2.6620507,0 -4.8051456,-2.10355 -4.8051456,-4.71648 V 142.36058 c 0,-2.61293 2.1430949,-4.71649 4.8051456,-4.71649 z"
                    />
                    <path
                        style={this.state.hoverSettingsTheme ? style.mockupActive : style.mockupDefault}
                        d="M 10.212796,5.7530481 H 199.78539 c 2.63064,0 4.74845,2.110808 4.74845,4.7327519 v 4.004658 c 0,2.621946 -2.11781,4.732753 -4.74845,4.732753 H 10.212796 c -2.6306351,0 -4.7484381,-2.110807 -4.7484381,-4.732753 V 10.4858 c 0,-2.6219439 2.117803,-4.7327519 4.7484381,-4.7327519 z"
                    />
                    <path
                        d="m 82.020835,54.717262 h 17.764882 c 2.093993,0 3.779763,1.685774 3.779763,3.779762 0,2.093988 -1.68577,3.779762 -3.779763,3.779762 H 82.020835 c -2.093988,0 -3.779761,-1.685774 -3.779761,-3.779762 0,-2.093988 1.685773,-3.779762 3.779761,-3.779762 z"
                    />
                    <path
                        style={this.state.hoverSettingsTheme ? style.mockupActive : style.mockupDefault}
                        d="m 112.44792,54.717262 h 17.76488 c 2.09399,0 3.77977,1.685774 3.77977,3.779762 0,2.093988 -1.68578,3.779762 -3.77977,3.779762 h -17.76488 c -2.09399,0 -3.77976,-1.685774 -3.77976,-3.779762 0,-2.093988 1.68577,-3.779762 3.77976,-3.779762 z"
                    />
                </svg>
            </div>
        );
    }

    renderParamsWithBackButton() {
        if(this.state.settingsSubmenu || this.state.settingsTheme || this.state.settingsCarousel || this.state.settingsGallery){
            return this.renderAdminCustomizeBack()
        }else{
            return this.renderAdminCustomize()
        }
    }

    renderAdminCustomizeBack() {
        return (
            <div>
                {this.renderAdminCustomize()}
                <RaisedButton onClick={this.openSettingsMenu} label="Retour" style={{position: "absolute", right: "0", bottom: "0", margin: "25px"}}/>
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
                <RaisedButton onMouseEnter={this.hoverTheme} onMouseLeave={this.hoverReset} onClick={this.openSettingsTheme} label="Thème" style={style.adminCustom}/>
                <RaisedButton onMouseEnter={this.hoverCarousel} onMouseLeave={this.hoverReset} onClick={this.openSettingsCarousel} label="Carousel" style={style.adminCustom}/>
                <RaisedButton onMouseEnter={this.hoverGallery} onMouseLeave={this.hoverReset} onClick={this.openSettingsGallery} label="Gallerie" style={style.adminCustom}/>
                <RaisedButton onMouseEnter={this.hoverSubmenu} onMouseLeave={this.hoverReset} onClick={this.openSettingsSubmenu} label="Sous-menu" style={style.adminCustom}/>
                <Toggle label="Fullscreen" labelStyle={style.fullSreenToggle}/>
                <Toggle label="Default" labelStyle={style.fullSreenToggle}/>
            </div>
        );
    }

    renderSettingsTheme() {
        return (
            <div className="full-width">
                <span>theme</span>
            </div>
        );
    }

    renderSettingsCarousel() {
        return (
            <div>
                <span>carousel</span>
            </div>
        );
    }

    renderSettingsSubmenu() {
        return (
            <div>
                <span>submenu</span>
            </div>
        );
    }

    renderSettingsGallery() {
        return (
            <div>
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
                <div className="col-md-9 vertical-align" style={{position: "initial"}}>
                    <div className="full-width">
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
