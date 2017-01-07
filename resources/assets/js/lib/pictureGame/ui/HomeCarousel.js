import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import Slider from 'react-slick';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import jQuery from 'jquery';

// Grid list
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

export default class HomeCarousel extends React.PureComponent {

    constructor () {
        this.styles = {
            gridRoot: {
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
            },
            gridList: {
                width: 500,
                height: 450,
                overflowY: 'auto',
            },
            gridTile: {
                width: 66,
                height: 100
            },
            spinerContainer: {
                position: "relative",
                width: "40px",
                margin: "0 auto"
            },
            spinerRefresh: {
                display: "inline-block",
                position: "relative",
            },
            hr: {
                width: "100%",
                maxWidth: "450px",
                minWidth: "110px",
                padding: "0 15px 10px 15px"
            }
        };
    }

    componentWillMount () {
        this.props.onReady();
    }

    scrollToAnchor (selector) {
        jQuery('html,body').animate({scrollTop: jQuery(selector).offset().top},'slow');
    }

    uiDateFormater(d) {
        return d
    }

    fadeButton () {
        jQuery(window).scroll(function(){
            if (jQuery(window).scrollTop() > 30){
                //jQuery('.home-carousel-btn-wrapper').fadeOut();
            }
        });
    }

    playButtonAction () {
        if (this.props.user.photoScopeGranted) {
            this.props.toggleSubmitPhotoModal();
            this.props.getFbPhotos(null);
            this.props.getFbAlbums();
        } else {
            this.props.startPlaying()
        }
    }

    renderSpinner () {
        return (
            <div style={this.styles.spinerContainer}>
                <RefreshIndicator
                    size={40}
                    left={10}
                    top={40}
                    status="loading"
                    style={this.styles.spinerRefresh}
                />
            </div>
        );
    }

    loadMorePhotos () {
        this.props.getFbPhotos(this.props.user.loadMoreFbPhotosLink)
    }

    renderPictures () {
        if(this.props.user.isFetching) {
            return this.renderSpinner();
        } else if (this.props.user.photos){
            return (
                <div style={this.styles.gridRoot}>
                    <GridList >
                        {this.props.user.photos.filter(p => p.images.length > 4).map((photo, key) => (
                            <GridTile
                                key={key}
                                title="toto"
                                subtitle={<span>by <b>toto</b></span>}
                                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                                >
                                    <img src={photo.images[4].source} />
                            </GridTile>
                        ))}
                    </GridList>
                    <FlatButton
                        label="load more"
                        primary={true}
                        onTouchTap={this.loadMorePhotos.bind(this)}
                    />
                </div>
            );
        }
    }
    renderAlbum (album, key) {
        const imgStyle = {
            height: 100,
            width: 66
        };
        console.debug("trying to render album: ",album)
        return (
            <GridList
                className="wtfChibar"
                key={key}
                title={album.name}
                subtitle={<span>le <b>chibar</b></span>}
                style={this.styles.gridTile}
                >
                <img style={imgStyle} src="" alt="CHIBAR"/>
            </GridList>
        )
    }
    renderAlbums () {
        if(this.props.user.isFetching) {
            return this.renderSpinner();
        } else if (this.props.user.albums.length > 0) {
            return (
                <div style={this.styles.gridRoot}>
                    <GridList>
                        {this.props.user.albums.forEach((a, k) => this.renderAlbum(a, k))}
                    </GridList>
                </div>
            );
        }
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
                autoScrollBodyContent={true}
                onRequestClose={this.props.toggleSubmitPhotoModal}
            >
                {this.renderAlbums()}
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
            {this.fadeButton()}
                <div className="home-carousel">
                    <div className="title-wrapper full-height full-width vertical-align">
                        <div>
                            <h1>PARDON MAMAN</h1>
                            <img style={this.styles.hr} src="homeCarouselHr.png" />
                            <div className="home-carousel-btn-wrapper vertical-align">
                                <RaisedButton
                                    label="VOIR LA GALERIE"
                                    labelPosition="before"
                                    className="home-carousel-button"
                                    containerElement="label"
                                    onClick={() => this.scrollToAnchor('.grid-layout')}
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
    getFbPhotos: T.func.isRequired,
    getFbAlbums: T.func.isRequired,
    refreshPhotos: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
