import React, {PropTypes as T} from "react";
import IconButton from 'material-ui/IconButton';
import LocationSearch from 'material-ui/svg-icons/device/location-searching';

import {uiDateFormater} from "../utils/DateParser";

import {GridTile} from "material-ui/GridList";

export default class UserAlbumPhoto extends React.PureComponent {
    render () {
        const imgSrc = this.props.picUrl || "homeCarouselHr.png";
        const imgStyle = {
            height: "auto",
            maxWidth: "100%"
        };
        return (
            <GridTile
                title={this.props.title}
                subtitle={
                    <span>
                        <b>
                            {uiDateFormater(this.props.dateCreated)}
                        </b>
                    </span>
                }
                actionIcon={
                    <IconButton
                        tooltip="Montrer album"
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

    handleClick (id) {
        this.props.photoClicked(this.props.photoId);
    }
}

UserAlbumPhoto.propTypes = {
    album: T.object.isRequired,
    photoClicked: T.func.isRequired,
    dateCreated: T.string.isRequired,
    picUrl: T.string.isRequired,
    title: T.string.isRequired
};
