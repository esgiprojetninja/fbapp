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
        console.debug("grid supposed to display: ", p)
        const title = p.title || "-";
        const caption = p.caption || "-";
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
                            <span className="grid-desc-title">{title}</span>
                            <span className="grid-desc-caption">{caption}</span>
                            <span className="grid-desc-author">Nombre de vote: {p.nbVotes}</span>
                        </div>
                    </div>
                </div>
          </div>
      )
    }

    renderGridImages () {
        let key = 0;
        return (
            <div className="grid-layout">
                <div className="grid-row">
                    {this.props.contest.currentContest.participants.forEach((p)=>this.renderGridImage(p, key++))}
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
