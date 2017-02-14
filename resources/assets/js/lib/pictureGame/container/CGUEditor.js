import {connect} from "react-redux";

import {
    getLegal,
    changeCGU
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
        },
        cguChanged: (content) => {
            dispatch(changeCGU(content));
        },
        saveCGU: (content) => {
            dispatch(changeCGU(content));
        }
    };
}

const CGUEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(CGUEditorUI);

export default CGUEditor;
