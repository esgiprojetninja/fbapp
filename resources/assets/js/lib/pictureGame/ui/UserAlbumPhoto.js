import React, {PropTypes as T} from "react";
import IconButton from 'material-ui/IconButton';
import LocationSearch from 'material-ui/svg-icons/device/location-searching';

import {GridTile} from "material-ui/GridList";

import {uiDateFormater} from "../utils/DateParser";
import PhotoReactions from "./PhotoReactions";


export default class UserAlbumPhoto extends React.PureComponent {
    isOneOfAlbumOpened () {
        return typeof this.props.user.albums.find(a => a.opened === true) !== "undefined" && this.props.participant.modalOpen === true;
    }
    render () {
        const imgSrc = this.props.picUrl || "homeCarouselHr.png";
        const imgStyle = {
            height: "auto",
            maxWidth: "100%"
        };
        return (
            <GridTile
                title={this.props.title}
                subtitle={this.renderSubtitle()}
                actionIcon={
                    <IconButton
                        tooltip={this.props.tooltipTitle}
                        touch={true}
                        tooltipPosition="top-left"
                        onClick={this.handleClick.bind(this)}
                        children={<LocationSearch color="white"/>}
                    />
                }
                actionPosition="right"
                >
                <img style={imgStyle} src={imgSrc} />
            </GridTile>
        );
    }

    renderSubtitle () {
        if (this.props.reactions) {
            return (
                <PhotoReactions reactions={this.props.reactions} />
            );
        }
        return (
            <span>
                <b>
                    {uiDateFormater(this.props.dateCreated)}
                </b>
            </span>
        );
    }

    handleClick () {
        // About to choose a photo to participate
        if ( this.isOneOfAlbumOpened() && this.props.participant.acceptedFBPublish !== true ) {
            console.debug("attempting to ask publish confirmation")
            this.props.changePublishPreviewSrcImage(this.props.picUrl || "homeCarouselHr.png");
            this.props.displayModalPublishPreview();
        } else {
            this.props.photoClicked(this.props.photoId);
        }
    }
}

UserAlbumPhoto.propTypes = {
    photoClicked: T.func.isRequired,
    dateCreated: T.string.isRequired,
    picUrl: T.string.isRequired,
    title: T.string.isRequired,
    tooltipTitle: T.string.isRequired,
    photoId: T.string.isRequired,
    reactions: T.object,
    changePublishPreviewSrcImage: T.func.isRequired,
    displayModalPublishPreview: T.func.isRequired
};
