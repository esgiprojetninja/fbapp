import React, {PropTypes as T} from "react";

import Dialog from 'material-ui/Dialog';
import {GridList} from "material-ui/GridList";
import FlatButton from "material-ui/FlatButton";

import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';


export default class ParticipantUpload extends React.PureComponent {
    constructor () {
        this.acceptedFiles = ['png, jpg, jpeg'];
        this.style = {
          dropzone:{
            width: "50vw",
            height: "75vh",
            maxHeight: "330px"
          }
        };
    }

    render () {
        const actions = [
            <FlatButton
                primary={true}
                keyboardFocused={true}
                icon = {<Clear />}
            />,
            <FlatButton
                primary={true}
                keyboardFocused={true}
                icon = {<Done />}
            />
        ];
        const formats = this.acceptedFiles.join(', ');
        return (
            <Dialog
                title={<h3 id="choose-picture-modal-title">Dépose ta photo (formats: {formats})</h3>}
                actions={actions}
                modal={false}
                open={this.props.participant.fileUploadModal}
                autoScrollBodyContent={true}
                onRequestClose={()=>{console.debug("suce ma bite")}}
            >
              <div style={this.style.dropzone}>
                SUCE MON ZGEG STP
              </div>
            </Dialog>
        );
    }
}

ParticipantUpload.propTypes = {
    participant: T.shape({
        modalOpen: T.bool.isRequired,
        fileUploadModal: T.bool.isRequired
    }).isRequired,
};
