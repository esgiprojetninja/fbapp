import {connect} from "react-redux";

import {
    getLegal,
    changeCGU,
    changePrivacyPolicy,
    changeRules,
    saveLegal
} from "../actions/legalActions";

import CGUEditorUI from "../ui/CGUEditor";

const mapStateToProps = (state) => {
    return state.legal
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
            dispatch(saveLegal());
        },
        savePrivacyPolicy: (content) => {
            dispatch(changePrivacyPolicy(content));
            dispatch(saveLegal());
        },
        saveRules: (content) => {
            dispatch(changeRules(content));
            dispatch(saveLegal());
        }
    };
}

const CGUEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(CGUEditorUI);

export default CGUEditor;
