import React, {PropTypes as T} from "react";

import Slider from "react-slick";

import {RaisedButton} from "material-ui";
import CameraEnhance from "material-ui/svg-icons/action/camera-enhance";
import AddAPhoto from "material-ui/svg-icons/image/add-a-photo";

export default class HomeSlider extends React.PureComponent {

    constructor () {
        this.playButtonAction = this.playButtonAction.bind(this);
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
            <div className="home-carousel">
                <div className="title-wrapper full-height full-width vertical-align">
                    <div className="text-center full-width">
                        <div className="relative" style={{marginBottom: '50px'}}>
                            <h1>PARDON MAMAN</h1>
                            <svg className="svg-canvas-line">
                                <path
                                   style={{fill: this.props.contest.color, stroke: this.props.contest.color}}
                                   d="m 19.098821,96.392228 c 2.45872,0 4.43813,1.97941 4.43813,4.438132 0,2.45872 -1.97941,4.43813 -4.43813,4.43813 -2.45872,0 -4.438123,-1.97941 -4.438123,-4.43813 0,-2.458722 1.979403,-4.438132 4.438123,-4.438132 z"
                                 />
                                <path
                                   style={{fill: this.props.contest.color, stroke: this.props.contest.color}}
                                   d="M 22.678594,100.83028 H 473.98214"
                                 />
                                <path
                                   style={{fill: this.props.contest.color, stroke: this.props.contest.color}}
                                   d="m 477.7619,96.014246 c 2.45872,0 4.43813,1.97941 4.43813,4.438144 0,2.45871 -1.97941,4.43813 -4.43813,4.43813 -2.45872,0 -4.43813,-1.97942 -4.43813,-4.43813 0,-2.458734 1.97941,-4.438144 4.43813,-4.438144 z"
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
                            {this.renderMainButton()}
                        </div>
                    </div>
                </div>
                <Slider {...settings}>
                    {this.renderSlides()}
                </Slider>
            </div>
        );
    }

    renderSlides () {
        const participantsArray = [
            {fb_source: "homeCarousel.jpg"},
            ...this.props.participants
        ];
        return participantsArray.map((p, i) => this.renderSlide(p, i));
    }

    renderSlide (participant, index) {
        return (
            <div className="image-wrapper" key={index}>
                <img className="img-cover" src={participant.fb_source} />
            </div>
        );
    }

    renderMainButton () {
        if (this.props.user.isConnected) {
            if (!this.props.currentParticipant.id_user) {
                return (
                    <RaisedButton
                        label="PARTICIPER AU CONCOURS"
                        labelPosition="before"
                        backgroundColor={this.props.contest.color}
                        labelColor="#fff"
                        icon={<AddAPhoto />}
                        className="home-carousel-button"
                        onTouchTap={this.playButtonAction}
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

    playButtonAction () {
        if (this.props.user.photoScopeGranted) {
            this.props.toggleSubmitPhotoModal();
            this.props.getFbAlbums();
        } else {
            // Checking for photo access permissions
            this.props.startPlaying()
        }
    }
}

HomeSlider.propTypes = {
    participants: T.arrayOf(T.object).isRequired,
    contest: T.object.isRequired,
    user: T.object.isRequired,
    getFbAlbums: T.func.isRequired,
    toggleSubmitPhotoModal: T.func.isRequired,
    startPlaying: T.func.isRequired,
    toggleConsultingPostedPhoto: T.func.isRequired
};
