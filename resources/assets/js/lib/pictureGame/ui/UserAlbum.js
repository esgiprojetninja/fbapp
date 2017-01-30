import React, {PropTypes as T} from "react";

import {GridList} from "material-ui/GridList";
import FlatButton from "material-ui/FlatButton";

export default class UserAlbum extends React.PureComponent {
    render () {
        //this.changeDialogTitle(album.name);
        return (
            <div style={this.props.gridRootStyle}>
                <GridList
                    cols={2}
                    children={this.props.album.photos.map((photo, key) => (
                        <UserAlbumPhoto
                            key={key}
                            title={photo.title}
                            dateCreated={photo.dateCreated}
                            photoClicked={this.props.photoClicked}
                            id={photo.id}
                        />
                    ))}
                >
                </GridList>
                {this.renderMoreAlbumPhotosLoader()}
            </div>
        )
    }

    renderMoreAlbumPhotosLoader () {
        if ( this.props.next ) {
            const style = {marginTop: "12px"}
            return (
                <div className="display-flex-row full-width" style={style}>
                    <FlatButton
                        label="Charger plus de photos"
                        primary={true}
                        onTouchTap={this.loadMorePhotos}
                        icon={<AutoNew />}
                    />
                </div>
            );
        } else {
            return (<div/>)
        }
    }

    loadMorePhotos () {
        this.props.loadMorePhotos(this.props.album.next, this.props.album.id);
    }
}

UserAlbum.propTypes = {
    gridRootStyle: T.object.isRequired,
    album: T.arrayOf(T.object).isRequired,
    loadMorePhotos: T.func.isRequired
};
