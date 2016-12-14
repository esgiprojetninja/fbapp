import React, {PropTypes as T} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

export default class CreateContestModal extends React.PureComponent {

    newContestChange (ev) {
        this.props.onNewContestChange(
            ev.target.name,
            ev.target.type == "checkbox" ? ev.target.checked : ev.target.checked
        );
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
            />,
        ];
        return (
            <Dialog
                title="Create a new contest"
                actions={actions}
                modal={false}
                open={this.props.open} >
                    <TextField
                        onChange={this.newContestChange.bind(this)}
                        name="title"
                        hintText="Title"
                    />
                    <br />
                    <TextField
                        onChange={this.newContestChange.bind(this)}
                        name="description"
                        hintText="description"
                    />
                    <br />
                    <Toggle
                        onToggle={this.newContestChange.bind(this)}
                        label="Active"
                        defaultToggled={true}
                        name="state"
                    />
            </Dialog>
        )
    }
}

CreateContestModal.propTypes = {
    onNewContestChange: T.func.isRequired,
    handleClose: T.func.isRequired,
    open: T.bool.isRequired
};
