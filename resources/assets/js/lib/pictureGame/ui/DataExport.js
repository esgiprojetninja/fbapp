import React, {PropTypes as T} from "react";

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

import Spinner from "./Spinner";

export default class DataExport extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    render () {
        if (this.props.isFetching) {
            return <Spinner />;
        }
        return (
            <div>
                {this.renderTable()}
                {this.renderActions()}
            </div>
        );
    }

    renderTable () {
        return (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Email</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {this.props.userList.map((user, index) => {
                        return (
                            <TableRow key={index}>
                                <TableRowColumn>{user.id}</TableRowColumn>
                                <TableRowColumn>{user.name}</TableRowColumn>
                                <TableRowColumn>{user.email}</TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        );
    }

    renderActions() {
        return (
            <FlatButton label="Export to csv" primary={true} />
        );
    }
}

DataExport.propTypes = {
    userList: T.arrayOf(T.object).isRequired,
    isFetching: T.bool.isRequired
};
