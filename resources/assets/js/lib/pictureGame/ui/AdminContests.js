import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import ContestModalForm from "../container/ContestModalForm";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import AutoComplete from 'material-ui/AutoComplete';
import Search from 'material-ui/svg-icons/action/search';
import {List, ListItem} from 'material-ui/List';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { BlockPicker } from 'react-color';
import { HuePicker } from 'react-color';
import { AlphaPicker } from 'react-color';

import Toggle from 'material-ui/Toggle';
import Dropzone from 'react-dropzone';

import { Grid, Row, Col } from 'react-bootstrap';

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
    textFont : {
        fontFamily: "Roboto, sans-serif",
        fontWeight: "200",
        textTransform: "uppercase",
        fontSize: "14px",
        margin: "10px 0",
        display: "block"
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
        '#00BCD4',
        "#CD2431"
    ]
}

export default class AdminContests extends React.PureComponent {
    constructor (props) {
        super(props);
        this.showmsg=this.showmsg.bind(this);
    }

    componentWillMount () {
        this.props.onReady();
    }

    showmsg(color){
        console.log(color);
        console.log(this);
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
                            onClick={this.props.onOpenEvents}
                        />
                        <ListItem
                            style={{padding: "0 15px"}}
                            primaryText="Paramètres"
                            secondaryText="Design de l'application"
                            onClick={this.props.onOpenSettings}
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
                <Col md={6}>
                    <Col xsHidden>
                        {this.renderAdminPreview()}
                    </Col>
                </Col>

                <Col md={6} style={{position: "initial"}}>
                    {this.renderParamsWithBackButton()}
                </Col>
            </div>
        );
    }

    renderParamsWithBackButton() {
        if(this.props.settingsSubmenu || this.props.settingsTheme || this.props.settingsCarousel || this.props.settingsGallery){
            return this.renderAdminCustomizeBack()
        }else{
            return this.renderAdminCustomize()
        }
    }

    renderAdminPreview() {
        const mockupStyle = {
            mockupActive: {
                fillOpacity: "1",
                fill: "#E6E6E6",
                stroke: "#E6E6E6",
                strokeWidth: "3"
            },
            mockupDefault: {
                fillOpacity: "0",
                fill: "#777",
                stroke: "#777",
                strokeWidth: "1"
            }
        };

        return (
            <div className="text-center">
                <svg className="svg-canvas">
                    <path
                        style={this.props.hoverSettingCarousel ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="M 8.1950631,4.1580226 H 201.82556 c 2.6512,0 4.78556,2.1044951 4.78556,4.7185989 V 99.618911 c 0,2.614099 -2.13436,4.718599 -4.78556,4.718599 H 8.1950631 c -2.6511919,0 -4.7855449,-2.1045 -4.7855449,-4.718599 V 8.8766215 c 0,-2.6141038 2.134353,-4.7185989 4.7855449,-4.7185989 z"
                    />
                    <path
                        style={this.props.hoverSettingSubmenu ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="M 8.7182074,107.17311 H 201.81336 c 2.63884,0 4.76324,2.16731 4.76324,4.85945 v 17.56881 c 0,2.69214 -2.1244,4.85945 -4.76324,4.85945 H 8.7182074 c -2.6388407,0 -4.7632504,-2.16731 -4.7632504,-4.85945 v -17.56881 c 0,-2.69214 2.1244097,-4.85945 4.7632504,-4.85945 z"
                    />
                    <path
                        style={this.props.hoverSettingGallery ? {fillOpacity: "1", fill: this.props.colorGallery, stroke: this.props.colorGallery, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="M 6.2292213,179.92316 H 88.419149 c 1.123203,0 2.027449,0.6238 2.027449,1.39866 v 42.60561 c 0,0.77486 -0.904246,1.39866 -2.027449,1.39866 H 6.2292213 c -1.1232086,0 -2.0274522,-0.6238 -2.0274522,-1.39866 v -42.60561 c 0,-0.77486 0.9042436,-1.39866 2.0274522,-1.39866 z"
                    />
                    <path
                        style={this.props.hoverSettingTheme ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="m 11.19286,7.3192399 h 187.48007 c 2.6016,0 4.69604,2.0875086 4.69604,4.6805111 v 3.960454 c 0,2.593005 -2.09444,4.680512 -4.69604,4.680512 H 11.19286 c -2.6015981,0 -4.6960245,-2.087507 -4.6960245,-4.680512 v -3.960454 c 0,-2.5930025 2.0944264,-4.6805111 4.6960245,-4.6805111 z"
                    />
                    <path
                        style={this.props.hoverSettingTheme ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="M 85.380105,55.74298 H 102.9489 c 2.07087,0 3.73804,1.667167 3.73804,3.738041 0,2.070874 -1.66717,3.73804 -3.73804,3.73804 H 85.380105 c -2.070875,0 -3.73804,-1.667166 -3.73804,-3.73804 0,-2.070874 1.667165,-3.738041 3.73804,-3.738041 z"
                    />
                    <path
                        style={this.props.hoverSettingTheme ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="m 115.47133,55.74298 h 17.56879 c 2.07087,0 3.73805,1.667167 3.73805,3.738041 0,2.070874 -1.66718,3.73804 -3.73805,3.73804 h -17.56879 c -2.07088,0 -3.73804,-1.667166 -3.73804,-3.73804 0,-2.070874 1.66716,-3.738041 3.73804,-3.738041 z"
                    />
                    <path
                        style={this.props.hoverSettingTheme ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="m 82.755255,47.284762 h 53.140435 c 0.58573,0 1.05728,0.471545 1.05728,1.057278 v 1.585916 c 0,0.585731 -0.47155,1.057277 -1.05728,1.057277 H 82.755255 c -0.585732,0 -1.057277,-0.471546 -1.057277,-1.057277 V 48.34204 c 0,-0.585733 0.471545,-1.057278 1.057277,-1.057278 z"
                    />
                    <path
                        style={this.props.hoverSettingFullscreen ? {fillOpacity: "1", fill: this.props.color, stroke: this.props.color, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="m 194.57457,285.30726 h 7.40095 c 1.46432,0 2.64319,1.17886 2.64319,2.6432 v 0.52863 c 0,1.46433 -1.17887,2.6432 -2.64319,2.6432 h -7.40095 c -1.46432,0 -2.64319,-1.17887 -2.64319,-2.6432 v -0.52863 c 0,-1.46434 1.17887,-2.6432 2.64319,-2.6432 z"
                    />
                    <path
                        style={this.props.hoverSettingGallery ? {fillOpacity: "1", fill: this.props.colorGallery, stroke: this.props.colorGallery, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="m 94.735891,180.13813 h 44.316029 c 0.60562,0 1.09319,0.6238 1.09319,1.39867 v 42.6056 c 0,0.77486 -0.48757,1.39866 -1.09319,1.39866 H 94.735891 c -0.605624,0 -1.093183,-0.6238 -1.093183,-1.39866 v -42.6056 c 0,-0.77487 0.487559,-1.39867 1.093183,-1.39867 z"
                    />
                    <path
                        style={this.props.hoverSettingGallery ? {fillOpacity: "1", fill: this.props.colorGallery, stroke: this.props.colorGallery, strokeWidth: "1"} : {fillOpacity: "0", fill: "#777", stroke: "#777", strokeWidth: "1"}}
                        d="m 144.78773,180.13812 h 60.0866 c 0.82115,0 1.48223,0.6238 1.48223,1.39867 v 42.6056 c 0,0.77486 -0.66108,1.39866 -1.48223,1.39866 h -60.0866 c -0.82115,0 -1.48221,-0.6238 -1.48221,-1.39866 v -42.6056 c 0,-0.77487 0.66106,-1.39867 1.48221,-1.39867 z"
                    />
                    <path
                       d="M 2.8632084,1.3079225 H 207.53625 c 0.60024,0 1.08346,0.4832241 1.08346,1.0834622 V 294.83969 c 0,0.60024 -0.48322,1.08347 -1.08346,1.08347 H 2.8632084 c -0.6002381,0 -1.0834622,-0.48323 -1.0834622,-1.08347 V 2.3913847 c 0,-0.6002381 0.4832241,-1.0834622 1.0834622,-1.0834622 z"
                    />
                </svg>
            </div>
        );
    }

    renderAdminCustomizeBack() {
        return (
            <div>
                {this.renderAdminCustomize()}
                <RaisedButton onClick={this.props.onOpenSettingsMenu} label="Retour" style={{position: "absolute", right: "0", bottom: "0", margin: "25px"}}/>
            </div>
        );
    }

    renderAdminCustomize() {
        if(this.props.settingsMenu){
            return this.renderSettingsMenu()
        }
        if(this.props.settingsTheme){
            return this.renderSettingsTheme()
        }
        if(this.props.settingsCarousel){
            return this.renderSettingsCarousel()
        }
        if(this.props.settingsSubmenu){
            return this.renderSettingsSubmenu()
        }
        if(this.props.settingsGallery){
            return this.renderSettingsGallery()
        }
    }

    renderSettingsMenu() {
        return (
            <div className="full-width">
                <RaisedButton onMouseEnter={this.props.onHoverSettingsTheme} onMouseLeave={this.props.onHoverReset} onClick={this.props.onOpenSettingsTheme} label="Thème" style={style.adminCustom}/>
                <RaisedButton onMouseEnter={this.props.onHoverSettingsCarousel} onMouseLeave={this.props.onHoverReset} onClick={this.props.onOpenSettingsCarousel} label="Carousel" style={style.adminCustom}/>
                <RaisedButton onMouseEnter={this.props.onHoverSettingsSubmenu} onMouseLeave={this.props.onHoverReset} onClick={this.props.onOpenSettingsSubmenu} label="Sous-menu" style={style.adminCustom}/>
                <RaisedButton onMouseEnter={this.props.onHoverSettingsGallery} onMouseLeave={this.props.onHoverReset} onClick={this.props.onOpenSettingsGallery} label="Gallerie" style={style.adminCustom}/>
                <Toggle onMouseEnter={this.props.onHoverSettingsFullscreen} onMouseLeave={this.props.onHoverReset} defaultToggled={true} label="Fullscreen" labelStyle={style.fullSreenToggle}/>
                <Toggle label="Default" labelStyle={style.fullSreenToggle}/>
            </div>
        );
    }

    renderSettingsTheme() {
        return (
            <div className="full-width text-center vertical-align">
                <div className="full-width">
                    <span style={style.textFont}>Couleur principal</span>
                    <Col md={8} mdOffset={2}>
                        <BlockPicker width="100%" colors={appColors.default} color={this.props.color} onChange={
                            (color) => {
                                this.props.onChangeColor(color.hex);
                            }
                        }/>
                    </Col>
                </div>
            </div>
        );
    }

    renderSettingsCarousel() {
        return (
            <div className="full-width text-center vertical-align">
                <Dropzone>
                  <div>Drop ou clique pour ajouter une image dans le carousel</div>
                </Dropzone>
            </div>
        );
    }

    renderSettingsSubmenu() {
        return (
            <div className="full-width text-center vertical-align">
                <Dropzone>
                  <div>Drop ou clique pour ajouter une image au sous-menu</div>
                </Dropzone>
            </div>
        );
    }

    renderSettingsGallery() {
        return (
            <div className="full-width text-center vertical-align">
                <div className="full-width">
                    <span style={style.textFont}>Couleur des tuiles</span>
                    <Col md={12}>
                        <div style={{margin: "15px 0"}}>
                            <HuePicker width="100%" color={this.props.colorGallery} onChange={
                                (color) => {
                                    this.props.onChangeColorGallery(color.hex);
                                }
                            }/>
                        </div>
                        <div style={{margin: "15px 0"}}>
                            <AlphaPicker width="100%" color={this.props.colorGallery} onChange={
                                (color) => {
                                    let formatedColor = "rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")";
                                    this.props.onChangeColorGallery(formatedColor);
                                }
                            }/>
                        </div>
                    </Col>
                </div>
            </div>
        );
    }

    renderAdminBody () {
        if(this.props.openEvents){
            return (
                <Col md={9} style={{alignSelf: "flex-start"}}>
                    <div>
                        {this.renderContent()}
                        <ContestModalForm
                        handleClose={this.props.onCreateModalOpenClick}
                        open={this.props.createModalOpen}
                        />
                    </div>
                </Col>
            );
        }
        if(this.props.openSettings){
            return (
                <Col md={9} className="vertical-align" style={{position: "initial"}}>
                    <div className="full-width">
                        {this.renderParams()}
                    </div>
                </Col>
            );
        }
    }

    render () {
        const actions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onTouchTap={this.props.onCloseAdmin}
          />,
          <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.props.onCloseAdmin}
          />,
        ];


        return (
            <div className="admin initial">
                <div className="initial">
                    <FlatButton
                        label="Admin"
                        onTouchTap={this.props.onOpenAdmin}
                    />
                    <Dialog
                      title="Admin"
                      bodyClassName="admin-body"
                      modal={false}
                      open={this.props.openAdmin}
                      contentStyle={style.modal}
                      onRequestClose={this.props.onCloseAdmin}
                      autoScrollBodyContent={true}
                    >
                        <div className="vertical-align">
                            <Col md={3} className="admin-sidebar">
                                {this.renderAdminSideBar()}
                            </Col>
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
