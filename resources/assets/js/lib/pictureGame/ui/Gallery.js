import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Picture from "./Picture";

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: 'auto',
  }
};


export default class Gallery extends React.PureComponent {
    render () {
        return (
            <GridList
                cellHeight={180}
                style={styles.gridList}
            >
                {this.props.pictures.map((picture, index) => (
                    <GridTile
                        subtitle={picture.url}
                        title={picture.user}
                        key={index}
                        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                    >
                        <img src="https://static.pexels.com/photos/194087/pexels-photo-194087.jpeg" />
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
