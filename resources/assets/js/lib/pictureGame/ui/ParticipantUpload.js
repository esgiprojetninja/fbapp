import React, {PropTypes as T} from "react";
import Dropzone from "react-dropzone"

import Dialog from 'material-ui/Dialog';
import FlatButton from "material-ui/FlatButton";

import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import InsertImg from 'material-ui/svg-icons/editor/insert-photo';


export default class ParticipantUpload extends React.PureComponent {
    constructor () {
        this.acceptedFiles = ['png, jpg, jpeg'];
        this.style = {
          dropzone: {
            width: "50vw",
            height: "75vh",
            maxHeight: "330px",
            maxWidth: "680px",
            border: "2px dashed #C7C7C7"
          },
          previewImg: {
            opacity: ".85",
            maxHeight: "100%"
          }
        };
    }

    dropAction(_files, e) {
      e.preventDefault();
      const reader = new FileReader();
      const file = e.target.files[0];
      reader.onload = () => {
        this.props.uploadedImgFile(reader.result);
      }
      reader.readAsDataURL(file);
    }

    renderImgPreview(){
      if ( this.props.participant.fileUploadedSource.length > 1 ) {
        return (
          <img style={this.style.previewImg} className="height-auto width-12 absolute" src={this.props.participant.fileUploadedSource} />
        )
      }
      return;
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
                title={<h3>Dépose ta photo (formats: {formats})</h3>}
                actions={actions}
                modal={false}
                open={this.props.participant.fileUploadModal}
                autoScrollBodyContent={true}
                onRequestClose={this.props.leaveUploadDisardingChanges}
            >
            <Dropzone
              multiple={false}
              minSize={5000}
              accept="image/*"
              onDropAccepted={this.dropAction.bind(this)}
              style={{widht:'auto', height: 'auto', border: 'none'}}
            >
              <div className="relative dashed-border border-theme-color display-flex-column margin-auto" style={this.style.dropzone}>
                <FlatButton
                    primary={true}
                    style={{height:"55px", width: "55px"}}
                    keyboardFocused={true}
                    icon = {<InsertImg style={{height:"55px", width: "55px"}}/>}
                />
                <p>Dépose ta photo ici</p>
                {this.renderImgPreview()}
              </div>
            </Dropzone>
            </Dialog>
        );
    }
}

ParticipantUpload.propTypes = {
    leaveUploadDisardingChanges: T.func.isRequired,
    uploadedImgFile: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired,
        fileUploadModal: T.bool.isRequired
    }).isRequired
};
