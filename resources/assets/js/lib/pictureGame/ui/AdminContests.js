import React, {PropTypes as T} from "react";
import AppNavBar from "./AppNavBar";
import CreateContestModal from "./CreateContestModal";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';

export default class AdminContests extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
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

    renderTable () {
        return (
            <div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Title</TableHeaderColumn>
                            <TableHeaderColumn>Description</TableHeaderColumn>
                            <TableHeaderColumn>From</TableHeaderColumn>
                            <TableHeaderColumn>To</TableHeaderColumn>
                            <TableHeaderColumn>End message</TableHeaderColumn>
                            <TableHeaderColumn>Winner</TableHeaderColumn>
                            <TableHeaderColumn>Active</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {this.renderRows()}
                    </TableBody>
                </Table>
                <RaisedButton label="Create a new contest" onTouchTap={this.props.onCreateModalOpenClick} />
            </div>
        );
    }

    renderRows () {
        return this.props.contests.map(contest => (
            <TableRow key={contest.id}>
                <TableRowColumn>{contest.id}</TableRowColumn>
                <TableRowColumn>{contest.title}</TableRowColumn>
                <TableRowColumn>{contest.description}</TableRowColumn>
                <TableRowColumn>{contest.start_date}</TableRowColumn>
                <TableRowColumn>{contest.end_date}</TableRowColumn>
                <TableRowColumn>{contest.end_msg}</TableRowColumn>
                <TableRowColumn>{contest.id_winner}</TableRowColumn>
                <TableRowColumn>{contest.status}</TableRowColumn>
            </TableRow>
        ));
    }

    render () {
        return (
            <div>
                <AppNavBar title="Admin"/>
                {this.renderContent()}
                <CreateContestModal
                    open={this.props.createModalOpen}
                    handleClose={this.props.onCreateModalOpenClick}
                    onNewContestChange={this.props.onNewContestChange}
                    save={this.props.onCreateContestSubmit}
                    newContest={this.props.newContest}
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
