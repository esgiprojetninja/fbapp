import React, {PropTypes as T} from "react";

import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Love from 'material-ui/svg-icons/action/favorite';
import Happy from 'material-ui/svg-icons/social/mood';
import Sad from 'material-ui/svg-icons/social/sentiment-very-dissatisfied';

export default class PhotoReactions extends React.PureComponent {

    constructor () {
        this.reactions = {
            LOVE: 0,
            LIKE: 0,
            SAD: 0,
            ANGRY: 0,
            HAHA: 0
        };
    }

    componentWillMount () {
        this.sortPhotoReactions();
    }

    sortPhotoReactions () {
        if ( this.props.reactions && this.props.reactions.data ) {
            this.props.reactions.data.forEach(reaction => {
                this.reactions[reaction.type] ++;
            });
        }
    }

    render () {
        const iconStyle = {
            display: "inline-block",
            height: "16px",
            width: "16px",
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            userSelect: "none"
        };
        return (
            <div className="album-photo-icons-container full-height full-width display-flex-row justify-start">
                <div className="relative margin-reset width-3">
                    <ThumbUp
                        className="photo_album_icon photo_album_icon_like"
                        color="white"
                        style={iconStyle}
                    />
                    <span className="absolute title-7">{this.reactions.LIKE}</span>
                </div>
                <div className="relative margin-reset width-3">
                    <Love
                        className="photo_album_icon photo_album_icon_like"
                        color="white"
                        style={iconStyle}
                    />
                    <span className="absolute title-7">{this.reactions.LOVE}</span>
                </div>
                <div className="relative margin-reset width-3">
                    <Happy
                        className="photo_album_icon photo_album_icon_like"
                        color="white"
                        style={iconStyle}
                    />
                    <span className="absolute title-7">{this.reactions.SAD}</span>
                </div>
                <div className="relative margin-reset width-3">
                    <Sad
                        className="photo_album_icon photo_album_icon_like"
                        color="white"
                        style={iconStyle}
                    />
                    <span className="absolute title-7">{this.reactions.HAHA}</span>
                </div>
            </div>
        );
    }
}

PhotoReactions.propTypes = {
    reactions: T.object.isRequired
};
