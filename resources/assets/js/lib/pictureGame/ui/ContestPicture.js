import React, {PropTypes as T} from "react";
import ContestPicture from "../container/ContestPicture";

import Snackbar from 'material-ui/Snackbar';
import {RaisedButton} from "material-ui";
import Lightbox from "react-image-lightbox";

export default class ContestPicture extends React.PureComponent {
    switchToPrevImageAction() {
        this.props.openImage(this.prevPhoto.id);
    }
    switchToNextImageAction() {
        this.props.openImage(this.nextPhoto.id);
    }

    getDeltaPhoto(aimedKeyDelta) {
        this.props.contest.currentContest.participants.forEach((p, key) => {
            if ( p.id === this.props.gallery.consultingPhoto.id ) {
                if ( this.props.contest.currentContest.participants[(key)+(aimedKeyDelta)] ) {
                    return  this.props.contest.currentContest.participants[(key)+(aimedKeyDelta)];
                } else {
                    return {fb_source: undefined};
                }
            }
        });
        return {fb_source: undefined};
    }

    renderToolbar() {
        if ( this.props.participant.currentParticipant.voted_for === 0 ) {
            return [
                <RaisedButton
                    label="Voter pour cette photo"
                    labelPosition="before"
                    backgroundColor={this.props.contest.color}
                    labelColor="#fff"
                    value={0}
                    onTouchTap={this.props.voteForDisplaidPic}
                />
            ];
        } else {
            return [
                <RaisedButton
                    label="Vous avez déjà voté"
                    labelPosition="before"
                    backgroundColor={this.props.contest.color}
                    labelColor="#fff"
                    value={0}
                />
            ];
        }
    }

    renderVoteInProcess() {
        return (
          <Snackbar
            message="vote en cours de traitement"
            open={this.props.gallery.isFetching}
          />
        )
    }

    renderVoteSuccessNotice() {
        const openCondition = this.props.gallery.errorMsg === false && this.props.gallery.isFetching === false && this.props.gallery.connected_participant !== false && this.props.gallery.aimed_participant !== false;
        return (
            <Snackbar
              message="Votre vote est enregistré"
              open={openCondition}
              onRequestClose={this.props.voteSuccessNoticed}
              autoHideDuration={500}
              action="OK"
              onActionTouchTap={this.props.voteSuccessNoticed}
            />
        )
    }

    renderVoteError() {
        const openCondition = this.props.gallery.errorMsg !== false && this.props.gallery.isFetching === false;
        if ( !openCondition ) { return; }
        return (
            <Snackbar
              message={this.props.gallery.errorMsg}
              open={openCondition}
              onRequestClose={this.props.noticedVoteErrorMsg}
              autoHideDuration={5000}
              action="OK"
              onActionTouchTap={this.props.noticedVoteErrorMsg}
            />
          )
    }

    renderLightBox () {
        this.nextPhoto = this.getDeltaPhoto(1);
        this.prevPhoto = this.getDeltaPhoto(-1);
        return (
            <div>
               {this.props.gallery.open &&
                   <Lightbox
                       mainSrc={this.props.gallery.consultingPhoto.fb_source}
                       imageTitle={this.props.gallery.consultingPhoto.title || "-"}
                       imagePadding={35}
                       imageCaption={this.props.gallery.consultingPhoto.caption || "--"}
                       nextSrc={this.nextPhoto.fb_source}
                       prevSrc={this.prevPhoto.fb_source}
                       onMovePrevRequest={this.switchToPrevImageAction.bind(this)}
                       onMoveNextRequest={this.switchToNextImageAction.bind(this)}
                       toolbarButtons={this.renderToolbar()}
                       clickOutsideToClose={true}
                       onCloseRequest={this.props.closeImage}
                   />
               }
           </div>
        )
    }

    render () {
        return (
            <div>
                {this.renderLightBox()}
                {this.renderVoteInProcess()}
                {this.renderVoteSuccessNotice()}
                {this.renderVoteError()}
            </div>
        )
    }
}

ContestPicture.propTypes = {
    contest: T.shape({
        currentContest: T.shape({
            participants: T.array.isRequired
        }).isRequired,
    }).isRequired,
    voteForDisplaidPic: T.func.isRequired,
    closeImage: T.func.isRequired,
    openImage: T.func.isRequired,
    voteSuccessNoticed: T.func.isRequired,
    noticedVoteErrorMsg: T.func.isRequired
};
