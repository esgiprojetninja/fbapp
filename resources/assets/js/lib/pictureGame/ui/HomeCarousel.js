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

    getUserParticipant () {
        if (this.props.contest.currentContest) {
            return this.props.contest.currentContest.participants.find(participant => {
                return this.props.user.data.id === participant.id_user;
            });
        }
        return undefined;
    }

    changeDialogTitle (newTitle) {
        if ( this.modalTitle === false ) {
            this.modalTitle = document.getElementById("choose-picture-modal-title")
        }
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
                    loadMorePhotos={this.props.loadMoreFbAlbumPhotos}
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
