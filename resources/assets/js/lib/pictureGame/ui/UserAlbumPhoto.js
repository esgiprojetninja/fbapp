import React, {PropTypes as T} from "react";

import {GridTile} from "material-ui/GridList";

return default class UserAlbumPhoto extends React.PureComponent {
    render () {
        const imgSrc = this.props.picUrl || "homeCarouselHr.png";
        const imgStyle = {
            height: "auto",
            maxWidth: "100%"
        }
        return (
            <GridTile
                title={this.props.title}
                subtitle={<span><b>{this.props.dateCreated}</b></span>}
                actionIcon={
                    <IconButton
                        tooltip="Montrer album"
                        touch={true}
                        tooltipPosition="top-left"
                        onClick={this.handleClick}
                        children={<LocationSearch color="white"/>}
                    />
                }
                actionPosition="right"
                >
                <img style={imgStyle} src={imgSrc} />
            </GridTile>
        );
    }

    this.handleClick() {
        this.props.photoClicked(this.props.id);
    }
}

UserAlbumPhoto.propTypes = {
    album: T.object.isRequired,
    key: T.number.isRequired,
    photoClicked: T.func.isRequired,
    imgStyle: T.object.isRequired,
    dateCreated: T.date.isRequired
};
