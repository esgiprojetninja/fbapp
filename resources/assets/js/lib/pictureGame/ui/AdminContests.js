import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import CreateContestModal from "./CreateContestModal";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';

export default class AdminContests extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    renderRows () {
        return this.props.contests.map(contest => (
            <TableRow key={contest.id}>
                <TableRowColumn>{contest.id}</TableRowColumn>
                <TableRowColumn>{contest.title}</TableRowColumn>
                <TableRowColumn>{contest.description}</TableRowColumn>
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
                        <TableHeaderColumn>Description</TableHeaderColumn>
                        <TableHeaderColumn>Active</TableHeaderColumn>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.renderRows()}
                    </TableBody>
                </Table>
                <RaisedButton label="Create a new contest" onTouchTap={this.props.onCreateModalOpenClick} />
                <CreateContestModal
                    open={this.props.createModalOpen}
                    handleClose={this.props.onCreateModalOpenClick}
                    onNewContestChange={this.props.onNewContestChange}
                    save={this.props.onCreateContestSubmit}
                />
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
