import {connect} from "react-redux";

import CGUEditorUI from "../ui/CGUEditor";

const mapStateToProps = (state) => {
    return {
        state.legal
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

const CGUEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(CGUEditorUI);

export default CGUEditor;
