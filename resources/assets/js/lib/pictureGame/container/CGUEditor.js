import {connect} from "react-redux";

import {
    getLegal
} from "../actions/legalActions";

import CGUEditorUI from "../ui/CGUEditor";

const mapStateToProps = (state) => {
    return {
        legal: state.legal
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getLegal());
        }
    };
}

const CGUEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(CGUEditorUI);

export default CGUEditor;
