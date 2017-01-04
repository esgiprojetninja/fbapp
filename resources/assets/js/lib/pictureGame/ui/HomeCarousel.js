import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';

export default class HomeCarousel extends React.PureComponent {

    render () {
        const settings = {
            infinite: true,
            speed: 4000,
            slidesToShow: 1,
            autoplay: true,
            arrows: true,
            pauseOnHover: true
        };

        return (
        <div className="home-carousel">
            <div className="title-wrapper full-height full-width vertical-align">
                <div>
                    <h1>PARDON MAMAN</h1>
                    <div className="vertical-align">
                        <RaisedButton
                            label="GALERIE CONCOURS"
                            labelPosition="before"
                            className="home-carousel-button"
                            containerElement="label"
                        />
                        <RaisedButton
                            label="AJOUTER UNE PHOTO"
                            labelPosition="before"
                            primary={true}
                            icon={<AddAPhoto />}
                            className="home-carousel-button"
                            onTouchTap={this.props.startPlaying}
                        />
                    </div>
                </div>
            </div>
            <Slider {...settings}>
                <div className="image-wrapper"><img className="img-cover" src="homeCarousel.jpg" /></div>
                <div className="image-wrapper"><img className="img-cover" src="homeCarousel2.jpg" /></div>
            </Slider>
        </div>
        )
    }
}

HomeCarousel.proptypes = {
    startPlaying: T.func.isRequired,
    user: T.shape().isRequired
};
