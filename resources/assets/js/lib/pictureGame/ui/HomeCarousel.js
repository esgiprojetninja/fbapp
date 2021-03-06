import React, {PropTypes as T} from "react";
import {GridList, GridTile} from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
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
import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Undo from 'material-ui/svg-icons/content/undo';

import ParticipantModal from "./ParticipantModal";
import Spinner from "./Spinner";
import UserAlbums from "./UserAlbums";
import UserAlbum from "./UserAlbum";

import HomeSlider from "../container/HomeSlider";
import NoticePop from '../container/Notice';
import ParticipantUpload from "../container/ParticipantUpload";
import PublishConfirmModal from "../container/PublishConfirmModal";


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
        else if ( !this.props.participant.modalOpen &&
        !this.props.participant.fileUploadModal &&
        this.props.participant.isFetching ) {
            return this.renderPostedPictureModal("Votre participation est en cours de traitement")
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
                    label="importer ma photo sur Facebook"
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

    render () {
        return (
            <div>
                <HomeSlider />
                {this.renderModal()}
                {this.renderStatusModal()}
                <ParticipantUpload
                  participant= {this.props.participant}
                />
                <PublishConfirmModal />
            </div>
        );
    }
}

HomeCarousel.propTypes = {
    onReady: T.func.isRequired,
    getFbAlbumPhotos: T.func.isRequired,
    toggleSubmitPhotoModal: T.func.isRequired,
    loadMoreFbAlbumPhotos: T.func.isRequired,
    proposePhotoForContest: T.func.isRequired,
    userNoticedRegistrationInContest: T.func.isRequired,
    cancelParticipation: T.func.isRequired,
    noticedCancelNotice: T.func.isRequired,
    displayFileUploadModal: T.func.isRequired,
    participant: T.shape({
        modalOpen: T.bool.isRequired
    }).isRequired,
    user: T.shape().isRequired
};
