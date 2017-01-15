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
            },
            imgStyle: {
                height: "auto",
                maxWidth: "100%"
            }
        };
        this.modalTitle = false;
    }

    componentWillMount () {
        this.props.onReady();
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log('Component DID UPDATE!', this.props)
    }

    scrollToAnchor (selector) {
        jQuery('html,body').animate({scrollTop: jQuery(selector).offset().top},'slow');
    }

    getDeployedAlbum () {
        const activeAlbum = this.props.user.albums.filter( album => album.photos !== undefined );
        return (activeAlbum.length === 1) ? activeAlbum[0] : false;
    }

    addIfInferior (num) {
        return (parseInt(num) < 10) ? "0"+num : num
    }

    uiDateFormater (d) {
        d = new Date(d.substr(0, 10));
        return this.addIfInferior(d.getDate()) + "/" + this.addIfInferior(parseInt(d.getMonth())+1) + "/" + d.getFullYear()
    }

    getSeparatePhotoReactions (photo) {
        const like = []; 
        const love = []; 
        const sad = []; 
        const angry = []; 
        const haha = [];
        if ( photo.reactions && photo.reactions.data ) {
            const l = photo.reactions.data.length;
            for ( let i = 0; i < l; i++ ) {
                const r = photo.reactions.data[i];
                switch ( r.type.toUpperCase() ) {
                    case "LIKE":
                       like.push(r);
                       break;
                    case "LOVE":
                        love.push(r);
                        break;
                    case "SAD":
                        sad.push(r);
                        break;
                    case "ANGRY":
                        angry.push(r);
                        break;
                    case "HAHA":
                        haha.push(r);
                        break;
                    default:
                        break;
                }
            }
        }
        return {like, love, sad, angry, haha};
    }

    changeDialogTitle (newTitle) {
        if ( this.modalTitle === false ) { this.modalTitle = document.getElementById("choose-picture-modal-title") }
        this.modalTitle.innerHTML = newTitle;
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
            // Checking for photo access permissions
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

    photoClickHandler (photo, clickedEl) {
        // this.props.getFbAlbumPhotos(album.id);
        console.debug("you chose: ", photo, clickedEl)
    }
    albumClickHandler (album, clickedEl) {
        this.props.getFbAlbumPhotos(album.id);
    }

    renderAlbumPhoto (photo, key) {
        // HAHA, ANGRY, SAD, LOVE, LIKE
        const imgSrc = photo.source || "homeCarouselHr.png";
        console.debug("about to render photo: ", photo);
        const {like, love, sad, angry, haha} = this.getSeparatePhotoReactions(photo);
        return (
            <GridTile
                key={key}
                title={photo.name}
                titlePosition="top"
                cols={1}
                subtitle={<span><b>{like.length+ "like" || 0}</b></span>}
                children={<img style={this.styles.imgStyle} src={imgSrc} />}
                actionIcon={<IconButton iconClassName="fb-ninja-icon" tooltip="Choisir photo" touch={true} tooltipPosition="top-left" onClick={function(e){this.photoClickHandler(photo, e)}.bind(this)}><StarBorder color="white"/></IconButton>}
                >
            </GridTile>
        )
    }

    renderDisplaydAlbum (album) {
        console.debug("displayd album: ", album);
        this.changeDialogTitle(album.name);
        return (
            <div style={this.styles.gridRoot}>
                <GridList 
                    cols={2}
                    children={album.photos.map((photo, key) => (
                        this.renderAlbumPhoto(photo, key)
                    ))}
                >
                </GridList>
            </div>
        )
    }

    renderAlbum (album, key) {
        // Au cas où la cover n'ait pas été trouvée par le call API
        const imgSrc = album.cover.url || "homeCarouselHr.png";
        return (
            <GridTile
                key={key}
                title={album.name}
                subtitle={<span>Album créé le <b>{this.uiDateFormater(album.created_time)}</b></span>}
                actionIcon={<IconButton iconClassName="fb-ninja-icon" tooltip="Montrer album" touch={true} tooltipPosition="top-left" onClick={function(e){this.albumClickHandler(album, e)}.bind(this)}><StarBorder color="white"/></IconButton>}
                >
                <img style={this.styles.imgStyle} src={imgSrc} />
            </GridTile>
        )
    }

    renderAlbums () {
        if(this.props.user.isFetching) {
            return this.renderSpinner();
        } else if (this.props.user.albums.length > 0) {
            this.changeDialogTitle("Vos albums");
            return (
                <div style={this.styles.gridRoot}>
                    <GridList >
                        {this.props.user.albums.map((album, key) => (
                            this.renderAlbum(album, key)
                        ))}
                    </GridList>
                </div>
            )
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
        const curAlbum = this.getDeployedAlbum();
        const uiToRender = ( curAlbum === false ) ? this.renderAlbums.bind(this) : this.renderDisplaydAlbum.bind(this);
        return (
            <Dialog
                title={<h3 id="choose-picture-modal-title">Scrollable Dialog</h3>}
                actions={actions}
                modal={false}
                open={this.props.participant.modalOpen}
                autoScrollBodyContent={true}
                onRequestClose={this.props.toggleSubmitPhotoModal}
                className="fbapp-pardonmaman-modal-participate-post"
            >
                {uiToRender(curAlbum)}
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
    getFbAlbumPhotos: T.func.isRequired,
    refreshPhotos: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
