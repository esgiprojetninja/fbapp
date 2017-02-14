import React, {PropTypes as T} from "react";

import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import Spinner from './Spinner';

export default class CurrentContestVotesModal extends React.PureComponent {

    renderRows() {
      if ( this.props.isFetching ) {
          return (
              <Spinner/>
          );
      }
      return this.props.participants.map(participant => (
          <TableRow key={participant.id}>
              <TableRowColumn className="admin-td admin-td-id">
                  {participant.id}
              </TableRowColumn>
              <TableRowColumn className="admin-td admin-td-title">
                  {participant.title}
              </TableRowColumn>
              <TableRowColumn className="admin-td admin-td-winner hidden-sm hidden-xs">
                  {participant.id_winner}
              </TableRowColumn>
              <TableRowColumn className="admin-td admin-td-state">
                  {participant.state}
              </TableRowColumn>
          </TableRow>
      ));
    }

    renderTable() {
        <Table bodyStyle={{overflow: 'visible'}} className="admin-table">
            <TableHeader>
                <TableRow>
                    <TableHeaderColumn>ID</TableHeaderColumn>
                    <TableHeaderColumn>Title</TableHeaderColumn>
                    <TableHeaderColumn className="hidden-sm hidden-xs">From</TableHeaderColumn>
                    <TableHeaderColumn className="hidden-sm hidden-xs">To</TableHeaderColumn>
                    <TableHeaderColumn className="hidden-sm hidden-xs">Winner</TableHeaderColumn>
                    <TableHeaderColumn>Active</TableHeaderColumn>
                    <TableHeaderColumn className="td-actions">Actions</TableHeaderColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {this.renderRows()}
            </TableBody>
        </Table>
    }

    render () {
        return (
            <Dialog
              title="Votes courant"
              modal={false}
              autoScrollBodyContent={true}
              open={this.props.open} >

            </Dialog>
        );
    }
}

CurrentContestVotesModal.propTypes = {
    getCurrentContestVoters: T.func.isRequired
};
