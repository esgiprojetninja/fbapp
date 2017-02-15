import React, {PropTypes as T} from "react";

import Spinner from './Spinner';

import Dialog from 'material-ui/Dialog';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FlatButton from 'material-ui/FlatButton';

import {fullWhite} from 'material-ui/styles/colors';

import DeleteIcon from 'material-ui/svg-icons/action/delete';


export default class CurrentContestVotesModal extends React.PureComponent {
    constructor() {
        this.style = {
            table: {
                minHeight: "100px"
            },
            actionsBtn : {
                margin: "0 2px"
            }
        }
        this.removeParticipantAction = this.removeParticipantAction.bind(this);
    }

    removeParticipantAction(id_user){
        this.props.cancelParticipation(id_user);
    }

    renderRows() {
        // name, source, nb_votes, id
        const tapAction = this.removeParticipantAction.bind(this);
        if ( this.props.vote.participants.length === 0 ) {
            return (
                <div className="full-width text-left">Aucun participant à l'heure actuelle</div>
            );
        }
        return this.props.vote.participants.map((participant, key) => (
            <TableRow key={key}>
                <TableRowColumn
                  children={<img className="full-height width-auto votes_consult_row_column_img" src={participant.fb_src} />}
                ></TableRowColumn>
                <TableRowColumn>
                    {participant.name}
                </TableRowColumn>
                <TableRowColumn>
                    {participant.nb_votes}
                </TableRowColumn>
                <TableRowColumn>
                    <div>
                        <FlatButton
                            style={this.style.actionsBtn}
                            backgroundColor={this.props.contest.color}
                            icon={<DeleteIcon color={fullWhite}/>}
                            className="hidden-sm hidden-xs"
                            primary={true}
                            onTouchTap={() => {tapAction(participant.id_user);}}
                        />
                    </div>
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
                        <TableHeaderColumn>Votes</TableHeaderColumn>
                        <TableHeaderColumn></TableHeaderColumn>
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

    getActions() {

    }

    render () {
        const actions = getActions();
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
