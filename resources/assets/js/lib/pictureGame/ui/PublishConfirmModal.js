import React, {PropTypes as T} from "react";

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import Undo from 'material-ui/svg-icons/content/undo';


export default class PublishConfirmModal extends React.PureComponent {

    addPhotoToContestAction(){
        // uploading binary image
        if ( this.props.participant.publishPreview.photo_id === false ) {
            this.props.validPreviewUploadImg(this.props.participant.publishPreview.upload_msg);
        } else {
            this.props.addPhotoToCurrentContest(this.props.participant.publishPreview.photo_id);
        }
    }
    confirmPublishlAction() {
        this.props.confirmPublishPreview();
        this.addPhotoToContestAction();

    }

    refusePublishAction() {
        this.props.refusePublishPreview();
        this.addPhotoToContestAction();
    }

    renderPublishPreview() {
        return (
            <div className="publish_preview_container">
                <div className="publish_preview_header display-flex-row justify-start full-width margin-reset">
                    <img className="width-2 full-height margin-reset align-start" src={this.props.participant.publishPreview.profile_icon_url}/>
                    <h3 className="publish_preview_profile_name width-21 full-height align-end margin-auto text-left">{this.props.participant.publishPreview.user_name}</h3>
                </div>
                <div className="display-flex-row full-width margin-reset">
                      <p className="text-left full-width publish_preview_message">{this.props.participant.publishPreview.message}</p>
                      <img className="full-width height-auto margin-auto align-start" src={this.props.participant.publishPreview.picture}/>
                      <p className="publish_preview_img_subtitle full-width text-left text-bold">{this.props.participant.publishPreview.name}</p>
                      <p className="caption full-width margin-reset align-start uppercase">{this.props.participant.publishPreview.caption}</p>
                </div>
            </div>
        )
    }

    render () {
        const actions = [
            <FlatButton
                primary={true}
                icon = {<Undo />}
                onTouchTap={this.props.cancelPreview}
            />,
            <FlatButton
              label="Non"
              primary={true}
              onTouchTap={this.refusePublishAction.bind(this)}
            />,
            <FlatButton
              label="Oui"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.confirmPublishlAction.bind(this)}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Nous autorisez-vous à poster sur votre mur pour vous ?"
                    actions={actions}
                    modal={true}
                    open={this.props.participant.acceptedFBPublish === "ongoing"}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >
                    {this.renderPublishPreview()}
                </Dialog>
            </div>
        );
    }
}

PublishConfirmModal.propTypes = {
    confirmPublishPreview: T.func.isRequired,
    refusePublishPreview: T.func.isRequired,
    addPhotoToCurrentContest: T.func.isRequired
};
