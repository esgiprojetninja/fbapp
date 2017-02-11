import React, {PropTypes as T} from "react";
import ContestPicture from "../container/ContestPicture";

import {RaisedButton} from "material-ui";
import Lightbox from "react-image-lightbox";

export default class ContestPicture extends React.PureComponent {
    voteForDisplaid (ev) {
        console.debug("about to vote for :", this.props.gallery.consultedPhoto)
    }

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
                onTouchTap={this.voteForDisplaid}
            />
        ];
    }



    renderLightBox () {
        this.nextPhoto = this.getDeltaPhoto(1);
        this.prevPhoto = this.getDeltaPhoto(-1);
        return (
            <div>
               {!!this.props.gallery.open &&
                   <Lightbox
                       mainSrc={this.props.gallery.consultedPhoto.fb_source}
                       imageTitle={this.props.gallery.consultedPhoto.title || "-"}
                       imagePadding={35}
                       imageCaption={this.props.gallery.consultedPhoto.caption || "--"}
                       nextSrc={nextPhoto.fb_source}
                       prevSrc={prevPhoto.fb_source}
                       onMovePrevRequest={this.switchToPrevImageAction.bind(this)}
                       onMoveNextRequest={thisswitchToNextImageAction.bind(this)}
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
    voteFor: T.func.isRequired,
    closeImage: T.func.isRequired,
    openImage: T.func.isRequired
};
