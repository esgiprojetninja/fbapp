import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Picture from "./Picture";

export default class Gallery extends React.PureComponent {
    render () {
        return (
            <GridList
                cellHeight={180}
            >
                {this.props.pictures.map((picture, index) => (
                    <GridTile
                        subtitle={picture.url}
                        title={picture.user}
                        key={index}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                        <img src="http://tattoospedia.com/wp-content/uploads/2013/12/Chest%20Tattoos/Tattoo%20Designs%20For%20Girls%20Chest%202.jpg" />
                    </GridTile>
                ))}
            </GridList>
        )
    }
}

Gallery.propTypes = {
    pictures: T.arrayOf(
        T.shape({
            url: T.string.isRequired,
            user: T.string.isRequired
        }).isRequired
    ).isRequired
};
