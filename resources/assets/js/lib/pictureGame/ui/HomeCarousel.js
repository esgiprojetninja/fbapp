import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo'
import Slider from 'react-slick';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import $ from 'jquery';

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

import ParticipantModal from "./ParticipantModal";
import Spinner from "./Spinner";
import UserAlbums from "./UserAlbums";
import UserAlbum from "./UserAlbum";

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

    scrollToAnchor (selector) {
      $('html,body').animate({scrollTop: $(selector).offset().top},'slow');
    }

    getDeployedAlbum () {
        return this.props.user.albums.find(album => album.opened);
    }

    addIfInferior (num) {
      return (parseInt(num) < 10) ? "0"+num : num
    }

    uiDateFormater (d) {
      d = new Date(d.substr(0, 10));
      return this.addIfInferior(d.getDate()) + "/" + this.addIfInferior(parseInt(d.getMonth())+1) + "/" + d.getFullYear()
    }

    getUserParticipant () {
        if (this.props.contest.currentContest) {
            return this.props.contest.currentContest.participants.find(participant => {
                return this.props.user.data.id === participant.id_user;
            });
        }
        return undefined;
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

    playButtonAction () {
    if (this.props.user.photoScopeGranted) {
      this.props.toggleSubmitPhotoModal();
      this.props.getFbAlbums();
    } else {
      // Checking for photo access permissions
      this.props.startPlaying()
    }
    }

    cancelParticipation () {
        this.props.toggleConsultingPostedPhoto();
        this.props.cancelParticipation();
    }

    loadMorePhotos (nextLink, album_id) {
      this.props.loadMoreFbAlbumPhotos(nextLink, album_id);
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
      const {like, love, sad, angry, haha} = this.getSeparatePhotoReactions(photo);
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

    renderPostedPictureModal(title, msg, leaveAction = false){
    const leaveAct = leaveAction || this.props.userNoticedRegistrationInContest;
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onTouchTap={leaveAct}
      />
    ];
    return (<Dialog
        title={<h3>{title}</h3>}
        actions={actions}
        modal={false}
        open={true}
        autoScrollBodyContent={true}
        onRequestClose={leaveAct}
      >{msg}</Dialog>);
    }

    renderModal () {
        if ( this.props.participant.photoSucessfullyAdded ) {
          return this.renderPostedPictureModal("Félicitations !", "Vous participez désormais au tournoi " + this.props.contest.currentContest.title);
        } else if ( !this.props.participant.photoSucessfullyAdded && !!this.props.participant.addPhotoToContestError ) {
          return this.renderPostedPictureModal("Participation non enregistrée !", this.props.participant.addPhotoToContestError);
        }
        // Simply consulting current contest photo
        else if ( this.props.participant.consultingPostedPhoto && !this.props.participant.deletingParticipationOngoing &&       !this.props.participant.participationCancelled ) {
            return (
                <ParticipantModal
                    cancelParticipation={this.props.cancelParticipation}
                    toggleConsultingPostedPhoto={this.props.toggleConsultingPostedPhoto}
                    currentParticipant={this.getUserParticipant()}
                    participant={this.props.participant}
                />
            );
        }
        // Requesting participation cancelling
        else if ( !this.props.participant.consultingPostedPhoto && this.props.participant.deletingParticipationOngoing &&
        !this.props.participant.participationCancelled  ) {
            return (
                <ParticipantModal
                    cancelParticipation={this.props.cancelParticipation}
                    toggleConsultingPostedPhoto={this.props.toggleConsultingPostedPhoto}
                    currentParticipant={this.getUserParticipant()}
                    participant={this.props.participant}
                />
            );
        }
        // Participation cancelling didn't work
        else if ( this.props.participant.consultingPostedPhoto && !this.props.participant.deletingParticipationOngoing && this.props.participant.participationCancelled === "failed" ) {
          return this.renderPostedPictureModal("Problème", "Désolé votre candidature n'a pu être annulée, n'hésitez pas à nous laisser un message si le problème persiste !", this.props.noticedCancelNotice)
        }
        // Participation cancelling was a success
        else if ( !this.props.participant.consultingPostedPhoto &&
          !this.props.participant.deletingParticipationOngoing && this.props.participant.participationCancelled === "success" ) {
            return this.renderPostedPictureModal("Bah alors ?", "Votre participation a été annulée à notre plus grand regret...", this.props.noticedCancelNotice)
        } else {
          const actions = [
            <FlatButton
              label="Annuler"
              primary={true}
              keyboardFocused={true}
              onTouchTap={this.props.toggleSubmitPhotoModal}
            />
          ];
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
              {this.renderModalGrid()}
            </Dialog>
          );
        }
    }

    renderModalGrid () {
        if (this.props.participant.isFetching) {
            return <Spinner />;
        }
        const openedAlbum = this.getDeployedAlbum();
        if (openedAlbum) {
            return (
                <UserAlbum
                    gridRootStyle={this.styles.gridRoot}
                    album={openedAlbum}
                    loadMorePhotos={this.loadMorePhotos}
                    photoClicked={this.props.proposePhotoForContest}
                />
            );
        }
        else {
            return (
                <UserAlbums
                    isFetching={this.props.user.isFetching}
                    albums={this.props.user.albums}
                    photoClicked={this.props.getFbAlbumPhotos}
                />
            );
        }
    }

    renderMainButton () {
        if ( this.props.user.isConnected ) {
            if (this.getUserParticipant() === undefined) {
                return (
                    <RaisedButton
                        label="PARTICIPER AU CONCOURS"
                        labelPosition="before"
                        primary={true}
                        icon={<AddAPhoto />}
                        className="home-carousel-button"
                        onTouchTap={this.playButtonAction.bind(this)}
                    />
                )
            }
            return (
                <RaisedButton
                    label="MA PHOTO EN JEU"
                    labelPosition="before"
                    primary={true}
                    icon={<CameraEnhance />}
                    className="home-carousel-button"
                    onTouchTap={this.props.toggleConsultingPostedPhoto}
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
    toggleConsultingPostedPhoto: T.func.isRequired,
    cancelParticipation: T.func.isRequired,
    noticedCancelNotice: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
