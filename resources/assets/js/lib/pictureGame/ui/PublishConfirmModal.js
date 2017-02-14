import React, {PropTypes as T} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class PublishConfirmModal extends React.PureComponent {
    constructor() {

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
              label="Non"
              primary={true}
              onTouchTap={()=>{console.debug("Comment oses-tu ?!")}}
            />,
            <FlatButton
              label="Oui"
              primary={true}
              keyboardFocused={true}
              onTouchTap={()=>{console.debug("That is the way, un hun un hun")}}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Nous autorisez-vous à poster sur votre mur pour vous ?"
                    actions={actions}
                    modal={true}
                    open={this.props.participant.acceptedFBPublish === "ongoing"}
                    onRequestClose={()=>{console.debug("here we go yo")}}
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

};
