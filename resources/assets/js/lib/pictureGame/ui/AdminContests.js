import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import ContestModalForm from "../container/ContestModalForm";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

import AutoComplete from 'material-ui/AutoComplete';
import Search from 'material-ui/svg-icons/action/search'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

const style = {
    actionsBtn : {
        margin: "0 2px"
    },
    modal : {
        width: "85%",
        maxWidth: "none"
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

export default class AdminContests extends React.PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            open : false,
            openEvents: true,
            openSettings: false
        }

        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.openEvents = this.openEvents.bind(this);
        this.openSettings = this.openSettings.bind(this);
    }

    openSettings() {
        this.setState({openEvents: false, openSettings: true});
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
                <div>

                </div>

                <div>
                    <ul>
                        <li>
                        <a onClick={this.openEvents}>Concours</a>
                        </li>
                        <li>
                        <a onClick={this.openSettings}>Paramètres</a>
                        </li>
                    </ul>
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
                <Table>
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
                <TableRowColumn>{contest.id}</TableRowColumn>
                <TableRowColumn>{contest.title}</TableRowColumn>
                <TableRowColumn>{this.uiDateFormater(new Date(contest.start_date))}</TableRowColumn>
                <TableRowColumn>{this.uiDateFormater(new Date(contest.end_date))}</TableRowColumn>
                <TableRowColumn>{contest.id_winner}</TableRowColumn>
                <TableRowColumn>{contest.state}</TableRowColumn>
                <TableRowColumn>
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

    renderAdminBody () {
        if(this.state.openEvents){
            return (
                <div>
                    {this.renderContent()}
                    <ContestModalForm
                    handleClose={this.props.onCreateModalOpenClick}
                    open={this.props.createModalOpen}
                    />
                </div>
            );
        }
        if(this.state.openSettings){
            return (
                <div>
                    <span>Paramètres</span>
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
            <div className="admin">
                <AppNavBar title="Admin"/>

                <div>
                    <RaisedButton label="Admin" onTouchTap={this.handleOpen} />
                    <Dialog
                      title="Admin"
                      bodyClassName="admin-body"
                      modal={false}
                      open={this.state.open}
                      contentStyle={style.modal}
                      onRequestClose={this.handleClose}
                      autoScrollBodyContent={true}
                    >
                        <div>
                            <div className="col-md-3 admin-sidebar">
                                {this.renderAdminSideBar()}
                            </div>
                            <div className="col-md-9">
                                {this.renderAdminBody()}
                            </div>
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
