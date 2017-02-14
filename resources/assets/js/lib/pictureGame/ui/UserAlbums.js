import React, {PropTypes as T} from "react";

import {GridList} from "material-ui/GridList";

import Spinner from "./Spinner";
import UserAlbumPhoto from "../container/UserAlbumPhoto";

export default class UserAlbums extends React.PureComponent {
    render () {
        const style = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        }
        if( this.props.isFetching ) {
            return <Spinner />;
        } else if (this.props.albums.length > 0) {
            return (
                <div style={style.gridRoot}>
                    <GridList >
                        {this.props.albums.map((album, key) => {
                            return (
                                <UserAlbumPhoto
                                    key={key}
                                    photoClicked={this.props.photoClicked}
                                    dateCreated={album.created_time}
                                    picUrl={album.cover.url}
                                    title={album.name}
                                    photoId={album.id}
                                    tooltipTitle="Montrer cet album"
                                />
                            );
                        })}
                    </GridList>
                </div>
            )
        }
    }
}

UserAlbums.propTypes = {
    isFetching: T.bool.isRequired,
    photoClicked: T.func.isRequired,
    albums: T.arrayOf(T.object).isRequired
};
