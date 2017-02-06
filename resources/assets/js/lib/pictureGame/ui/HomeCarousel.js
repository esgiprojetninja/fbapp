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
import Undo from 'material-ui/svg-icons/content/undo';

import ParticipantModal from "./ParticipantModal";
import Spinner from "./Spinner";
import UserAlbums from "./UserAlbums";
import UserAlbum from "./UserAlbum";
import NoticePop from '../container/Notice';
import ParticipantUpload from "../container/ParticipantUpload";

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
      this.showmsg = this.showmsg.bind(this);
    }

    componentWillMount () {
      this.props.onReady();
    }

    scrollToAnchor (selector) {
      $('html,body').animate({scrollTop: $(selector).offset().top},'slow');
    }

    getTitleToDisplay() {
      const depAlb = this.getDeployedAlbum();
      const t = ( depAlb ) ? depAlb.name : "Vos albums";
      const _t = ( t.length === 0 ) ? "Album sans nom" : t;
      return (
          <h3 id="choose-picture-modal-title">{_t}</h3>
      );
    }

    getDeployedAlbum () {
        return this.props.user.albums.find(album => album.opened);
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

    renderPostedPictureModal(msg, leaveAction = false, customTimeout = 5000){
        return (
            <div>
                <NoticePop
                    msg={msg}
                    leaveAction={leaveAction}
                    customTimeout={customTimeout}
                />
            </div>

        );
    }

    renderStatusModal () {
        if (this.props.participant.photoSucessfullyAdded) {
          return this.renderPostedPictureModal(
              "Félicitations ! Vous participez désormais au tournoi " + this.props.contest.currentContest.title, this.props.userNoticedRegistrationInContest
          );
        }
        else if (this.props.participant.addPhotoToContestError) {
          return this.renderPostedPictureModal(
              "Participation non enregistrée ! " + this.props.participant.addPhotoToContestError,   this.props.userNoticedRegistrationInContest
          );
        }
        else if (this.props.participant.participationCancelled === "success") {
            return this.renderPostedPictureModal("Bah alors ? Votre participation a été annulée à notre plus grand regret...", this.props.noticedCancelNotice)
        }
        // Participation cancelling didn't work
        else if (this.props.participant.participationCancelled === "failed" ) {
          return this.renderPostedPictureModal("Désolé votre candidature n'a pu être annulée, n'hésitez pas à nous laisser un message si le problème persiste !", this.props.noticedCancelNotice)
        }
    }

    renderModal () {
        if (this.props.participant.currentParticipant.id_user) {
            return (
                <ParticipantModal
                    cancelParticipation={this.props.cancelParticipation}
                    toggleConsultingPostedPhoto={this.props.toggleConsultingPostedPhoto}
                    currentParticipant={this.props.participant.currentParticipant}
                    participant={this.props.participant}
                />
            );
        }
        else {
            const actions = [
                <FlatButton
                    label="importer ma photo"
                    primary={true}
                    keyboardFocused={true}
                    icon = {<Upload />}
                    onTouchTap={this.props.displayFileUploadModal}
                />,
                <FlatButton
                    label="fermer"
                    primary={true}
                    onTouchTap={this.props.toggleSubmitPhotoModal}
                />
            ];
            if ( this.getDeployedAlbum() ) {
                actions.push(
                    (<div><FlatButton
                        label="albums"
                        primary={true}
                        icon = {<Undo />}
                        onTouchTap={this.props.getFbAlbums}
                    /></div>)
                )
            }
            return (
                <Dialog
                    title={this.getTitleToDisplay()}
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
        if (this.props.user.isConnected) {
            if (!this.props.participant.currentParticipant.id_user) {
                return (
                    <RaisedButton
                        label="PARTICIPER AU CONCOURS"
                        labelPosition="before"
                        backgroundColor={this.props.contest.color}
                        labelColor="#fff"
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
                    labelColor="#fff"
                    backgroundColor={this.props.contest.color}
                    icon={<CameraEnhance />}
                    className="home-carousel-button"
                    onTouchTap={this.props.toggleConsultingPostedPhoto}
                />
            );
        }
    }

    showmsg() {
        console.log(this);
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
                      <div className="text-center full-width">
                          <div className="relative" style={{marginBottom: '50px'}}>
                              <h1>PARDON MAMAN</h1>
                              <svg className="svg-canvas-line">
                                  <path
                                     style={{fill: this.props.contest.color, stroke: this.props.contest.color}}
                                     d="m 15.697033,93.4119 c 3.90042,0 7.04048,3.140061 7.04048,7.04048 0,3.90043 -3.14006,7.04048 -7.04048,7.04048 -3.90042,0 -7.0404701,-3.14005 -7.0404701,-7.04048 0,-3.900419 3.1400501,-7.04048 7.0404701,-7.04048 z"
                                   />
                                  <path
                                     style={{fill: this.props.contest.color, stroke: this.props.contest.color}}
                                     d="m 480.96366,92.655946 c 3.90044,0 7.04049,3.14005 7.04049,7.04047 0,3.900424 -3.14005,7.040474 -7.04049,7.040474 -3.90043,0 -7.04048,-3.14005 -7.04048,-7.040474 0,-3.90042 3.14005,-7.04047 7.04048,-7.04047 z"
                                   />
                                  <path
                                     style={{fill: this.props.contest.color, stroke: this.props.contest.color}}
                                     d="M 22.678594,100.83028 H 473.98214"
                                   />
                               </svg>
                          </div>
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
              {this.renderStatusModal()}
              <ParticipantUpload
                  participant= {this.props.participant}
              />
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
    displayFileUploadModal: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
