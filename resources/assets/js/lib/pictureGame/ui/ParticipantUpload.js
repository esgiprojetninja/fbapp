import React, {PropTypes as T} from "react";
import Dropzone from "react-dropzone";

import Dialog from 'material-ui/Dialog';
import FlatButton from "material-ui/FlatButton";
import TextField from 'material-ui/TextField';

import Done from 'material-ui/svg-icons/action/done';
import Undo from 'material-ui/svg-icons/content/undo';
import Clear from 'material-ui/svg-icons/content/clear';
import InsertImg from 'material-ui/svg-icons/editor/insert-photo';


import Spinner from "./Spinner";
import NoticePop from '../container/Notice';


export default class ParticipantUpload extends React.PureComponent {
    constructor () {
        this.photoDescriptionMsg = "Pardonne moi maman !";
        this.acceptedFiles = ['png, jpg, jpeg'];
        this.style = {
          dropzone: {
            width: "50vw",
            height: "75vh",
            maxHeight: "330px",
            maxWidth: "680px",
            border: "2px dashed #C7C7C7"
          },
          dropzoneInput:{
            height: "100%",
            width: "100%",
            border: "none",
            zIndex: "99",
            opacity: "0",
            position: "absolute"
          },
          previewImg: {
            opacity: ".94",
            maxHeight: "100%",
            zIndex: "1"
          },
          requestSpinner: {
            top: "0",
            left: "0"
          }
        };
    }

    removePreviewImgAction() {
        if ( this.props.participant.isFetching === false ) {
            this.props.removePreviewImg();
        }
        this.props.leaveUploadDisardingChanges();
    }

    validPreviewImgAction() {
        if ( this.props.participant.isFetching === false ) {
            this.props.validPreviewImg(this.photoDescriptionMsg);
        }
    }

    dropAction(_files, e) {
        e.preventDefault();
        const reader = new FileReader();
        try {
            const file = (e.target.nodeName === "INPUT") ? e.target.files[0] : e.target.firstChild.files[0];
            reader.onloadend = () => {
                this.props.previewImgUploaded(reader.result);
            }
            reader.readAsDataURL(file);
        } catch(e){
            console.warn("Missed container: ", e)
        }
    }

    changeDescriptionAction(e){
        this.photoDescriptionMsg = e.target.value;
    }

    renderUploadNotice() {
        if ( this.props.participant.isFetching === false && this.props.participant.modalOpen === false ) {
            if ( this.props.participant.fileUploadError !== false ) {
                return (
                    <div>
                      <NoticePop
                          msg={this.props.participant.fileUploadError}
                          leaveAction={this.props.noticedUploadPhotoNotice}
                      />
                    </div>
                );
            }
            else if ( this.props.participant.photoSucessfullyAdded === true ) {
                const successFunc = () => {
                    this.props.noticedUploadPhotoNotice();
                    this.props.userNoticedRegistrationInContest();
                };
                return (
                    <div>
                      <NoticePop
                          msg="Vous avez été inscrit au tournoi en cours."
                          leaveAction={successFunc.bind(this)}
                      />
                    </div>
                );
            }
            else if ( this.props.participant.addPhotoToContestError !== false ) {
                const failedFunc = () => {
                    this.props.noticedUploadPhotoNotice();
                    this.props.userNoticedRegistrationInContest();
                };
                return (
                    <div>
                      <NoticePop
                          msg="Votre photo a été créee mais n'a pu être rajoutée au tournoi, vous pouvez la sélectionner parmis vos albums facebook"
                          leaveAction={failedFunc.bind(this)}
                      />
                    </div>
                );
            }
        }
    }

    renderLoader(){
        if ( !this.props.participant.isFetching ){return};
        return (
            <div className="relative dashed-border border-theme-color display-flex-column margin-auto" style={this.style.dropzone}>
              <Spinner/>
            </div>
        );
    }

    renderImgPreview() {
        if ( this.props.participant.fileUploadedSource.length > 1 ) {
            return (
                <img style={this.style.previewImg} className="height-auto width-12 absolute" src={this.props.participant.fileUploadedSource} />
            )
        }
        return;
    }

    renderDropZone() {
        if ( this.props.participant.isFetching ){return};
        return (
          <div className="relative dashed-border border-theme-color display-flex-column margin-auto" style={this.style.dropzone}>
            <Dropzone
              multiple={false}
              minSize={5000}
              accept="image/*"
              onDropAccepted={this.dropAction.bind(this)}
              style={this.style.dropzoneInput}
            >
            </Dropzone>
            <FlatButton
                primary={true}
                style={{height:'55px', width: '55px', zIndex:'1'}}
                icon = {<InsertImg style={{height:'55px', width: '55px'}}/>}
            />
            <p style={{zIndex:'1'}}>Dépose ta photo ici</p>
            {this.renderImgPreview()}
          </div>
        )
    }

    renderPhotoInputDescription() {
        if ( this.props.participant.fileUploadedSource.length > 1 ) {
            return (
              <div className="display-flex-column margin-auto">
                <TextField
                    defaultValue={this.photoDescriptionMsg}
                    floatingLabelText="Votre description"
                    onChange={this.changeDescriptionAction.bind(this)}
                    fullWidth={true}
                />
              </div>
            )
        }
    }

    render () {
        const actions = [
            <FlatButton
                label="retour vers mes albums"
                primary={true}
                icon = {<Undo />}
                onTouchTap={this.removePreviewImgAction.bind(this)}
            />,
            <FlatButton
                primary={true}
                label="supprimer photo"
                icon = {<Clear />}
                disabled={this.props.participant.fileUploadedSource.length < 1}
                onTouchTap={this.props.removePreviewImg}
            />,
            <FlatButton
                disabled={this.props.participant.fileUploadedSource.length < 1}
                label="valider mon choix"
                primary={true}
                keyboardFocused={this.props.participant.fileUploadedSource.length > 1}
                icon = {<Done />}
                onTouchTap={this.validPreviewImgAction.bind(this)}
            />
        ];
        const formats = this.acceptedFiles.join(', ');
        return (
            <Dialog
                title={<h3>Dépose ta photo</h3>}
                actions={actions}
                modal={false}
                open={this.props.participant.fileUploadModal}
                autoScrollBodyContent={true}
                onRequestClose={this.props.closeAllModals}
            >
                {this.renderPhotoInputDescription()}
                {this.renderDropZone()}
                {this.renderLoader()}
                {this.renderUploadNotice()}
            </Dialog>
        );
    }
}

ParticipantUpload.propTypes = {
    leaveUploadDisardingChanges: T.func.isRequired,
    previewImgUploaded: T.func.isRequired,
    validPreviewImg: T.func.isRequired,
    removePreviewImg: T.func.isRequired,
    noticedUploadPhotoNotice: T.func.isRequired,
    userNoticedRegistrationInContest: T.func.isRequired,
    closeAllModals: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired,
        fileUploadModal: T.bool.isRequired,
        fileUploadedSource: T.string.isRequired,
        fileUploadRequest: T.bool.isRequired,
        fileUploadError: T.bool.isRequired
    }).isRequired
};
