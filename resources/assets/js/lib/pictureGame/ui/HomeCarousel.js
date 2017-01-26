import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import Slider from 'react-slick';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import jQuery from 'jquery';

// Grid list
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';

// Icons & SVG
import LocationSearch from 'material-ui/svg-icons/device/location-searching';
import Upload from 'material-ui/svg-icons/file/file-upload';
import CameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import AutoNew from 'material-ui/svg-icons/action/autorenew';
import Love from 'material-ui/svg-icons/action/favorite';
import Happy from 'material-ui/svg-icons/social/mood';
import Sad from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';
import Refresh from 'material-ui/svg-icons/navigation/refresh';


// TODO: sometimes img can't load

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
            },
            loadMoreAlbumPhotosButton: {
                margin: "0 auto",
                maxWidth: "250px",
                background: "red",
                borderRadius: "100%"
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

    getUserContestPhoto () {
      let i;
      for (i = 0; i < this.props.participant.currentContest.length; i++) {
        const part = this.props.participant.currentContest[i];
        if ( part.user_fbid == this.props.user.data.fb_id ) {
          return {...part};
        }
      }
      return false;
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
            this.props.getFbAlbums();
        } else {
            // Checking for photo access permissions
            this.props.startPlaying()
        }
    }

    displayPlaidPhotoAction () {
      const userContestPhoto = this.getUserContestPhoto();
      console.debug("current playing photo for user ", userContestPhoto)
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

    renderMoreAlbumPhotosLoader (album) {
        if ( album.next ) {
            const style = {marginTop: "12px"}
            return (
                <div className="display-flex-row full-width" style={style}>
                    <FlatButton
                        label="Charger plus de photos"
                        primary={true}
                        onTouchTap={function(e){this.loadMorePhotos(album.next, album.id)}.bind(this)}
                        icon={<AutoNew />}
                    />
                </div>
            );
        } else {
            return (<div></div>)
        }
    }

    loadMorePhotos (nextLink, album_id) {
        this.props.loadMoreFbAlbumPhotos(nextLink, album_id);
    }

    albumClickHandler (album) {
        this.props.getFbAlbumPhotos(album.id);
    }

    albumPhotoChosenAction (photo_id) {
      this.props.proposePhotoForContest(photo_id);
      this.props.clearAlbumPhotos();
    }

    renderOldAlbumPhoto (photo, key) {
        const titleStyle = {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            flexFlow: "row wrap"
        };
        const iconStyle = {
            display: "inline-block",
            color: "rgba(0, 0, 0, 0.870588)",
            height: "16px",
            width: "16px",
            fill: "fakePropToMakeClassesApplyTheirColor",
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            userSelect: "none"
        }
        // HAHA, ANGRY, SAD, LOVE, LIKE
        const imgSrc = photo.source || "homeCarouselHr.png";
        // console.debug("about to render photo: ", photo);
        const {like, love, sad, angry, haha} = this.getSeparatePhotoReactions(photo);
        console.debug("buya: ",like, love, sad, angry, haha);
        return (
            <GridTile
                key={key}
                title=" "
                titlePosition="bottom"
                style={titleStyle}
                cols={1}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0.2) 100%)"
                subtitle={
                    <div className="album-photo-icons-container full-height full-width display-flex-row justify-start">
                        <div className="relative margin-reset width-3">
                            <ThumbUp
                                className="photo_album_icon photo_album_icon_like fill-primary"
                                color="white"
                                style={iconStyle}
                            />
                            <span className="absolute color-fb title-7">{like.length}</span>
                        </div>
                        <div className="relative margin-reset width-3">
                            <Love
                                className="photo_album_icon photo_album_icon_like"
                                color="white"
                                style={iconStyle}
                            />
                            <span className="absolute title-7">{love.length}</span>
                        </div>
                        <div className="relative margin-reset width-3">
                            <Happy
                                className="photo_album_icon photo_album_icon_like"
                                color="white"
                                style={iconStyle}
                            />
                            <span className="absolute title-7">{haha.length}</span>
                        </div>
                        <div className="relative margin-reset width-3">
                            <Sad
                                className="photo_album_icon photo_album_icon_like"
                                color="white"
                                style={iconStyle}
                            />
                            <span className="absolute title-7">{sad.length}</span>
                        </div>
                    </div>
                }
                children={<img style={this.styles.imgStyle} src={imgSrc} />}
                >
            </GridTile>
        )
    }

    renderAlbumPhoto (photo, key, colNumb = 1) {
        const imgSrc = photo.source || "homeCarouselHr.png";
        return (
            <GridTile
                key={key}
                title={photo.name || " "}
                subtitle={<span>Photo postée le <b>{this.uiDateFormater(photo.created_time)}</b></span>}
                cols={colNumb}
                actionIcon={
                    <IconButton tooltip="Choisir photo" touch={true} tooltipPosition="top-left" onClick={() => this.albumPhotoChosenAction(photo.id)}
                    children={<Upload color="white"/>}
                    />
                }
                children={<img style={this.styles.imgStyle} src={imgSrc} />}
                >
            </GridTile>
        )
    }

    renderDisplaidAlbum (album) {
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
                {this.renderMoreAlbumPhotosLoader(album)}
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
                actionIcon={
                    <IconButton tooltip="Montrer album" touch={true} tooltipPosition="top-left" onClick={function(e){this.albumClickHandler(album)}.bind(this)}
                        children={<LocationSearch color="white"/>}
                    />
                }
                actionPosition="right"
                >
                <img style={this.styles.imgStyle} src={imgSrc} />
            </GridTile>
        )
    }

    renderAlbums () {
        if( this.props.user.isFetching ) {
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

    renderRegisteredModal(title, msg){
      const actions = [
        <FlatButton
          label="Ok"
          primary={true}
          keyboardFocused={true}
          onTouchTap={this.props.userNoticedRegistrationInContest}
        />
      ];
      return (<Dialog
          title={<h3>{title}</h3>}
          actions={actions}
          modal={false}
          open={true}
          autoScrollBodyContent={true}
          onRequestClose={this.props.userNoticedRegistrationInContest}
          className="fbapp-pardonmaman-modal-participate-post"
        >{msg}</Dialog>);
    }

    renderModal () {
      if ( this.props.participant.photoSucessfullyAdded ) {
        return this.renderRegisteredModal("Félicitations !", "Vous participez désormais au tournoi " + this.props.contest.currentContest.title);
      } else if ( !this.props.participant.photoSucessfullyAdded && !!this.props.participant.addPhotoToContestError ) {
        return this.renderRegisteredModal("Participation non enregistrée !", this.props.participant.addPhotoToContestError);
      } else {
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
        const uiToRender = ( this.props.participant.isFetching ) ? this.renderSpinner.bind(this) : ( curAlbum === false ) ? this.renderAlbums.bind(this) : this.renderDisplaidAlbum.bind(this);
        return (
          <Dialog
            title={<h3 id="choose-picture-modal-title">Vos albums</h3>}
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
    }

    renderMainButton () {
        if ( this.props.user.isConnected ) {
          return ( this.getUserContestPhoto() === false ) ?
            (<RaisedButton
              label="PARTICIPER AU CONCOURS"
              labelPosition="before"
              primary={true}
              icon={<AddAPhoto />}
              className="home-carousel-button"
              onTouchTap={this.playButtonAction.bind(this)}
            />)
            :
            (<RaisedButton
                label="MA PHOTO EN JEU"
                labelPosition="before"
                primary={true}
                icon={<CameraEnhance />}
                className="home-carousel-button"
                onTouchTap={this.displayPlaidPhotoAction.bind(this)}
            />);
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
                                {this.renderMainButton.call(this)}
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
    getFbAlbums: T.func.isRequired,
    getFbAlbumPhotos: T.func.isRequired,
    loadMoreFbAlbumPhotos: T.func.isRequired,
    proposePhotoForContest: T.func.isRequired,
    userNoticedRegistrationInContest: T.func.isRequired,
    clearAlbumPhotos: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
