import React, {PropTypes as T} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class CreateContestModal extends React.PureComponent {

    newContestChange (ev, val, attr) {
        let value;

        if (typeof val.getMonth === "function" || attr === "id_winner") {
            value = val;
        }
        else if (ev != null && ev.target.type === "checkbox") {
            value = ev.target.checked === true ? 1 : 0;
        } else {
            value = ev.target.value;
        }
        this.props.onNewContestChange(
            attr ? attr : ev.target.name,
            value
        );
    }

    startDateChange(ev, val) {
        this.newContestChange(ev, val, "start_date");
    }

    endDateChange(ev, val) {
        this.newContestChange(ev, val, "end_date");
    }

    idWinnerChange(ev, key, val) {
        this.newContestChange(null, val, "id_winner");
    }

    render () {
        const actions = [
            <FlatButton
                label="Close"
                secondary={true}
                onTouchTap={this.props.handleClose}
            />,
            <FlatButton
                label="Save"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.save}
                type="submit"
            />,
        ];
        return (
            <Dialog
                title="Create a new contest"
                modal={false}
                autoScrollBodyContent={true}
                open={this.props.createModalOpen} >
                <form onSubmit={this.props.onCreateContestSubmit}>
                    <TextField
                        onChange={this.newContestChange.bind(this)}
                        value={this.props.newContest.title}
                        name="title"
                        hintText="Title"
                    />
                    <br />
                    <TextField
                        onChange={this.newContestChange.bind(this)}
                        value={this.props.newContest.description}
                        name="description"
                        multiLine={true}
                        rows={2}
                        hintText="Description"
                    />
                    <br />
                    <TextField
                        onChange={this.newContestChange.bind(this)}
                        value={this.props.newContest.end_msg}
                        name="end_msg"
                        multiLine={true}
                        rows={2}
                        hintText="End message"
                    />
                    <br />
                    <DatePicker
                        onChange={this.startDateChange.bind(this)}
                        value={new Date(this.props.newContest.start_date)}
                        hintText="Start date"
                        name="start_date"
                    />
                    <br />
                    <DatePicker
                        onChange={this.endDateChange.bind(this)}
                        value={new Date(this.props.newContest.end_date)}
                        hintText="End date"
                        name="end_date"
                    />
                    <br />
                    <SelectField
                        onChange={this.idWinnerChange.bind(this)}
                        value={this.props.newContest.id_winner}
                        floatingLabelText="Winner"
                        name="id_winner"
                        >
                        <MenuItem value={1} primaryText="Please" />
                        <MenuItem value={2} primaryText="Change" />
                        <MenuItem value={3} primaryText="Me" />
                    </SelectField>
                    <br />
                    <Toggle
                        onToggle={this.newContestChange.bind(this)}
                        value={this.props.newContest.state}
                        label="Active"
                        defaultToggled={true}
                        name="state"
                    />
                    <br />
                    <FlatButton
                        label="Close"
                        secondary={true}
                        onTouchTap={this.props.handleClose}
                    />
                    <FlatButton
                        label="Save"
                        primary={true}
                        keyboardFocused={true}
                        type="submit"
                    />
                </form>
            </Dialog>
        )
    }
}

CreateContestModal.propTypes = {
    onNewContestChange: T.func.isRequired,
    handleClose: T.func.isRequired,
    open: T.bool.isRequired,
    newContest: T.shape()
};
