import {connect} from "react-redux";
import {
    closeNotice,
    openNotice
} from "../actions/noticeActions";
import NoticeComponent from "../ui/Notice";

const mapStateToProps = (state) => {
    return state.notice;
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeNotice: () => {
            dispatch(closeNotice())
        },
        openNotice: () => {
            dispatch(openNotice())
        }
    };
}

const Notice = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoticeComponent);

export default Notice;
