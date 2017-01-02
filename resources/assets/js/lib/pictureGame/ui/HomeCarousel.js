import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';

const styles = {
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
         speed: 500,
         slidesToShow: 1,
         autoplay: true,
         arrows: true,
         pauseOnHover: true
        };

        return (
            <Slider {...settings}>
              <div style={styles.imgWrapper}><img style={styles.img} src="homeCarousel.jpg" /></div>
              <div style={styles.imgWrapper}><img style={styles.img} src="homeCarousel2.jpg" /></div>
            </Slider>
        )
    }
}
