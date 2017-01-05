import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

export default class HomeCarousel extends React.PureComponent {

    componentWillMount () {
        this.props.onReady();
    }

    playButtonAction () {
        if (this.props.user.photoScopeGranted) {
            this.props.toggleSubmitPhotoModal();
        } else {
            this.props.startPlaying()
        }
    }

    renderPictures () {
        
    }

    renderModal () {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.props.toggleSubmitPhotoModal}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.props.toggleSubmitPhotoModal}
            />,
        ];
        return (
            <Dialog
                title="Scrollable Dialog"
                actions={actions}
                modal={false}
                open={this.props.participant.modalOpen}
                onRequestClose={this.props.toggleSubmitPhotoModal}
                autoScrollBodyContent={true}
                >
                {this.renderPictures()}
            </Dialog>
        );

    }

    renderPlayButton () {
        if (this.props.user.isConnected) {
            return (
                <RaisedButton
                    label="AJOUTER UNE PHOTO"
                    labelPosition="before"
                    primary={true}
                    icon={<AddAPhoto />}
                    className="home-carousel-button"
                    onTouchTap={this.playButtonAction.bind(this)}
                />
            );
        }
    }

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
            <div>
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
                                {this.renderPlayButton()}
                            </div>
                        </div>
                    </div>
                    <Slider {...settings}>
                        <div className="image-wrapper"><img className="img-cover" src="homeCarousel.jpg" /></div>
                        <div className="image-wrapper"><img className="img-cover" src="homeCarousel2.jpg" /></div>
                    </Slider>
                </div>
                {this.renderModal()}
            </div>
        );
    }
}

HomeCarousel.propTypes = {
    startPlaying: T.func.isRequired,
    onReady: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
