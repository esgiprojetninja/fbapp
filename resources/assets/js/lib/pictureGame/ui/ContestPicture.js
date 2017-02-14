import React, {PropTypes as T} from "react";
import ContestPicture from "../container/ContestPicture";

import Snackbar from 'material-ui/Snackbar';
import {RaisedButton} from "material-ui";
import Lightbox from "react-image-lightbox";
import Share from 'material-ui/svg-icons/social/share';

export default class ContestPicture extends React.PureComponent {
    constructor() {
        this.style = {
            actionButton: {
                margin: "0 5px"
            }
        }
    }
    switchToPrevImageAction() {
        this.props.openImage(this.prevPhoto.id);
    }
    switchToNextImageAction() {
        this.props.openImage(this.nextPhoto.id);
    }

    sharePhotoAction() {
        this.props.sharePhoto();
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
        const actions = []
        if ( this.props.participant.currentParticipant.voted_for === 0 ) {
            actions.push(
                <RaisedButton
                    label="Voter pour cette photo"
                    labelPosition="before"
                    backgroundColor={this.props.contest.color}
                    labelColor="#fff"
                    value={0}
                    onTouchTap={this.props.voteForDisplaidPic}
                    style={this.style.actionButton}
                />
            );
        } else {
            actions.push(
                <RaisedButton
                    label="Vous avez déjà voté"
                    labelPosition="before"
                    backgroundColor={this.props.contest.color}
                    labelColor="#fff"
                    value={0}
                    style={this.style.actionButton}
                />
            );
        }
        actions.push(
            <RaisedButton
              backgroundColor={this.props.contest.color}
              labelColor="#fff"
              value={1}
              icon={<Share/>}
              onTouchTap={this.sharePhotoAction.bind(this)}
              style={this.style.actionButton}
            />
        );
        return actions;
    }

    renderVoteInProcess() {
        return (
          <Snackbar
            message="Vote en cours de traitement"
            open={this.props.gallery.isFetching && this.props.gallery.votingSuccess === "ongoing" }
          />
        )
    }


    renderVoteSuccessNotice() {
        const openCondition = this.props.gallery.isFetching === false && this.props.gallery.votingSuccess === true;
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

    renderShareSuccess() {
        const openCondition = this.props.gallery.isFetching === false && this.props.gallery.sharingSuccess === true;
        return (
            <Snackbar
              message="Partage effectué"
              open={openCondition}
              onRequestClose={this.props.voteSuccessNoticed}
              autoHideDuration={5000}
              action="OK"
              onActionTouchTap={this.props.voteSuccessNoticed}
            />
        )
    }

    renderShareInProcess() {
        return (
          <Snackbar
            message="Partage en cours de traitement"
            open={this.props.gallery.isFetching && this.props.gallery.sharingSuccess === "ongoing"}
          />
        )
    }
    renderErrorNotice() {
        const openCondition = typeof this.props.gallery.errorMsg === "string" && this.props.gallery.isFetching === false;
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
                {this.renderErrorNotice()}
                {this.renderShareInProcess()}
                {this.renderShareSuccess()}
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
    noticedVoteErrorMsg: T.func.isRequired,
    sharePhoto: T.func.isRequired
};
