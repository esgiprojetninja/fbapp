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
            if ( p.id === this.props.gallery.consultedPhoto.id ) {
                if ( this.props.contest.currentContest.participants[(key)+(aimedKeyDelta)] ) {
                    return  this.props.contest.currentContest.participants[(key)+(aimedKeyDelta)];
                } else {
                    return {fb_source: undefined};
                }
            }
        });
        return {fb_source: undefined};
    }

    renderToolbar(id) {
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
    }



    renderLightBox () {
        this.nextPhoto = this.getDeltaPhoto(1);
        this.prevPhoto = this.getDeltaPhoto(-1);
        const photoCondition = this.props.participant.isVoting === false & this.props.gallery.open;
        return (
            <div>
                <Snackbar
                  message="vote en cours de traitement"
                  open={this.props.participant.isVoting}
                />
               {photoCondition &&
                   <Lightbox
                       mainSrc={this.props.gallery.consultedPhoto.fb_source}
                       imageTitle={this.props.gallery.consultedPhoto.title || "-"}
                       imagePadding={35}
                       imageCaption={this.props.gallery.consultedPhoto.caption || "--"}
                       nextSrc={this.nextPhoto.fb_source}
                       prevSrc={this.prevPhoto.fb_source}
                       onMovePrevRequest={this.switchToPrevImageAction.bind(this)}
                       onMoveNextRequest={this.switchToNextImageAction.bind(this)}
                       toolbarButtons={this.renderToolbar(this.props.gallery.consultedPhoto.id)}
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
    openImage: T.func.isRequired
};
