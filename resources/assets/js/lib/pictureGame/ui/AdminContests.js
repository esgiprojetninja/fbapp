import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default class AdminContests extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    renderRows () {
        return this.props.contests.map(contest => (
            <TableRow>
                <TableRowColumn>{contest.id}</TableRowColumn>
                <TableRowColumn>{contest.title}</TableRowColumn>
                <TableRowColumn>{contest.status}</TableRowColumn>
            </TableRow>
        ));
    }

    render () {
        return (
            <div>
                <AppNavBar title="Admin"/>
                <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHeaderColumn>ID</TableHeaderColumn>
                        <TableHeaderColumn>Title</TableHeaderColumn>
                        <TableHeaderColumn>Active</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.renderRows()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

AdminContests.propTypes = {
    contests: T.arrayOf(
        T.shape().isRequired
    ).isRequired,
    onReady: T.func.isRequired
};
