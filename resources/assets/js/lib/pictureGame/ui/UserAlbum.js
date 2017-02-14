import React, {PropTypes as T} from "react";

import {GridList, GridTile} from "material-ui/GridList";
import FlatButton from "material-ui/FlatButton";
import AutoNew from 'material-ui/svg-icons/action/autorenew';

import UserAlbumPhoto from "../container/UserAlbumPhoto";

export default class UserAlbum extends React.PureComponent {
    renderTiles(){
        if( this.props.album.photos && this.props.album.photos.length > 0) {
            return this.props.album.photos.map((photo, key) => (
                <UserAlbumPhoto
                    key={key}
                    title="-"
                    dateCreated={photo.created_time}
                    photoClicked={this.props.photoClicked}
                    id={photo.id}
                    picUrl={photo.source}
                    tooltipTitle="Sélectionner cette photo"
                    photoId={photo.id}
                    reactions={photo.reactions}
                />
            ));
        } else {
            return (
              <GridTile
                  cols={2}
                  className="display-flex-column"
                  style={{display:"overrideMaterialUI"}}
              >
                  <p>Aucune photo dans cet album</p>
              </GridTile>

            )
        }
    }

    render () {
        return (
            <div style={this.props.gridRootStyle}>
                <GridList
                    cols={2}
                    children={this.renderTiles()}
                >
                </GridList>
                {this.renderMoreAlbumPhotosLoader()}
            </div>
        )
    }

    renderMoreAlbumPhotosLoader () {
        if ( this.props.album.next ) {
            const style = {marginTop: "12px"}
            return (
                <div className="display-flex-row full-width" style={style}>
                    <FlatButton
                        label="Charger plus de photos"
                        primary={true}
                        onTouchTap={this.loadMorePhotos.bind(this)}
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
    album: T.object.isRequired,
    loadMorePhotos: T.func.isRequired
};
