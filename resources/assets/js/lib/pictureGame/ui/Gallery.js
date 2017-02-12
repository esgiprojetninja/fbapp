import React, {PropTypes as T} from "react";
import ContestPicture from "../container/ContestPicture";

export default class Gallery extends React.PureComponent {
    constructor() {
        this.openImageAction = this.openImageAction.bind(this);
    }

    openImageAction(participant_id) {
        this.props.openImage(participant_id);
    }


    renderGridImage(p, key) {
        return(
            <div
              className="grid-item"
              key={key}
              onClick={() => {this.openImageAction(p.id)}}
            >
                <div className="grid-well">
                    <img
                        className="img-cover-no-height"
                        src={p.fb_source}
                    />
                    <div>
                        <div className="grid-gradient" style={{background: this.props.contest.colorGallery}}>
                        </div>
                        <div className="grid-desc">
                            <span className="grid-desc-title">{p.title || "-"}</span>
                            <span className="grid-desc-caption">{p.caption || "-"}</span>
                            <span className="grid-desc-author">Nombre de vote: {p.nb_votes || 0}</span>
                        </div>
                    </div>
                </div>
          </div>
      )
    }

    renderGridImages () {
        return (
            <div className="grid-layout">
                <div className="grid-row">
                    {(this.props.contest.currentContest.participants.map((p, key)=>this.renderGridImage(p, key)))}
                </div>
            </div>
        )
    }

    render () {
        return (
            <div>
                {this.renderGridImages()}
                <ContestPicture/>
            </div>
        )
    }
}

Gallery.propTypes = {
    contest: T.shape({
        currentContest: T.shape({
            participants: T.array.isRequired
        }).isRequired,
    }).isRequired,
    openImage: T.func.isRequired
};
