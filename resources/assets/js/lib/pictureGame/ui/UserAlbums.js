import React, {PropTypes as T} from "react";

import {GridList} from "material-ui/GridList";

import Spinner from "./Spinner";

export default class UserAlbums extends React.PureComponent {
    render () {
        const style = {
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around'
        }
        if( this.props.isFetching ) {
            return <Spinner />
        } else if (this.props.albums.length > 0) {
            this.changeDialogTitle("Vos albums");
            return (
                <div style={style.gridRoot}>
                    <GridList >
                        {this.props.albums.map((album, key) => (
                            this.renderAlbum(album, key)
                        ))}
                    </GridList>
                </div>
            )
        }
    }
}

UserAlbums.propTypes = {
    isFetching: T.bool.isRequired,
    albums: T.arrayOf(T.object).isRequired
};
