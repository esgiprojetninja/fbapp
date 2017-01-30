import React, {PropTypes as T} from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {GridList, GridTile} from "material-ui/GridList";

export default class ParticipantModal extends React.PureComponent {
    render () {
        const actions = (this.props.requestingCancel) ? [] : [
            <FlatButton
                label="Retirer ma photo"
                primary={true}
                onTouchTap={this.props.cancelParticipation.bind(this)}
            />,
            <FlatButton
                label="Quitter"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.toggleConsultingPostedPhoto}
            />
        ];
        const imgRender =  () => (<img src={this.props.currentParticipant.fb_source} />);
        return (
            <Dialog
                title={<h3>Votre photo-participation</h3>}
                actions={actions}
                modal={false}
                open={this.props.participant.consultingPostedPhoto}
                autoScrollBodyContent={true}
                onRequestClose={this.props.toggleConsultingPostedPhoto}
                className="fbapp-pardonmaman-modal-participate-post"
            >
                <GridList cols={1}>
                    <GridTile
                        key={0}
                        cols={1}
                        children={imgRender()}
                    >
                    </GridTile>
                </GridList>
            </Dialog>
        );
    }
}

ParticipantModal.propTypes = {
    currentParticipant: T.object.isRequired,
    toggleConsultingPostedPhoto: T.func.isRequired
}
