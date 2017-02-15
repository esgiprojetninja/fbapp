import React, {PropTypes as T} from "react";

import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Spinner from './Spinner';

export default class CurrentContestVotesModal extends React.PureComponent {
    constructor() {
        this.style = {
            table: {
                minHeight: "100px"
            }
        }
    }
    renderRows() {
        // name, source, nb_votes, id
        return this.props.vote.participants.map(participant => (
            <TableRow key={participant.id}>
                <TableRowColumn
                  children={<img className="full-height width-auto votes_consult_row_column_img" src={participant.fb_src} />}
                ></TableRowColumn>
                <TableRowColumn>
                    {participant.name}
                </TableRowColumn>
                <TableRowColumn>
                    {participant.nb_votes}
                </TableRowColumn>
            </TableRow>
        ));
    }

    renderTable() {
        if ( this.props.vote.isFetching === true ) {
            return (
                <Spinner/>
            );
        };
        return (
            <Table
              fixedHeader={true}
              selectable={false}
              multiSelectable={false}
              style={this.style.table}>
                <TableHeader
                  displaySelectAll={false}
                  adjustForCheckbox={false}
                  enableSelectAll={false}
                >
                    <TableRow>
                        <TableHeaderColumn>Photo</TableHeaderColumn>
                        <TableHeaderColumn>Auteur</TableHeaderColumn>
                        <TableHeaderColumn>votes</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                  displayRowCheckbox={false}
                  stripedRows={false}
                >
                    {this.renderRows()}
                </TableBody>
            </Table>
        );
    }

    render () {
        return (
            <Dialog
              title={"Votes courant : " + this.props.contest.currentContest.title}
              modal={false}
              autoScrollBodyContent={true}
              open={this.props.vote.open} >
                {this.renderTable()}
            </Dialog>
        );
    }
}

CurrentContestVotesModal.propTypes = {
    getCurrentContestVoters: T.func.isRequired
};
