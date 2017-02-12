import React, {PropTypes as T} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class PublishConfirmModal extends React.PureComponent {

    renderPublishPreview() {
        return (
            <div>
            {this.props.participant.publishPreview.dom}
            </div>
        )
    }
    render () {
        const actions = [
            <FlatButton
              label="Refuser"
              primary={true}
              onTouchTap={()=>{console.debug("tu as refusé fdp")}}
            />,
            <FlatButton
              label="Accepter"
              primary={true}
              keyboardFocused={true}
              onTouchTap={()=>{console.debug("dataaaa")}}
            />,
        ];
        return (
            <div>
                <Dialog
                    title="Voulez vous prévenir vos amis de votre participation afin d'augmenter vos chances de victoire ?"
                    actions={actions}
                    modal={true}
                    open={this.props.participant.acceptedFBPublish === "ongoing"}
                    onRequestClose={()=>{console.debug("here we go yo")}}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                >
                    Nous pouvons poster pour vous, ça donnera à peu près:
                    {this.renderPublishPreview()}
                </Dialog>
            </div>
        );
    }
}

PublishConfirmModal.propTypes = {

};
