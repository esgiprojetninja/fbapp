import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';

const styles = {
  button: {
    margin: 12
  },
  wrapper: {
    position: 'relative'
  },
  titleWrapper: {
    height: '100%',
    width: '100%',
    color: 'white',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1
  },
  thisTitle: {
    fontSize: '45px',
    fontWeight: 800,
    display: 'block'
  },
  imgWrapper: {
    height: '80vh'
  },
  img: {
    objectFit: 'cover',
    width: '100%'
  }
};

export default class HomeCarousel extends React.PureComponent {
    render () {
      var settings = {
        infinite: true,
        speed: 4000,
        slidesToShow: 1,
        autoplay: true,
        arrows: true,
        pauseOnHover: true
      };
      return (
        <div style={styles.wrapper}>
          <div style={styles.titleWrapper}>
            <div>
              <h1 style={styles.thisTitle}>PARDON MAMAN</h1>
              <RaisedButton
                label="CONTEST GALLERY"
                labelPosition="before"
                style={styles.button}
                containerElement="label"
              />
              <RaisedButton
                label="ADD A PHOTO"
                labelPosition="before"
                primary={true}
                icon={<AddAPhoto />}
                style={styles.button}
              />
            </div>
          </div>
          <Slider {...settings}>
            <div style={styles.imgWrapper}><img style={styles.img} src="homeCarousel.jpg" /></div>
            <div style={styles.imgWrapper}><img style={styles.img} src="homeCarousel2.jpg" /></div>
          </Slider>
        </div>
      )
    }
}
