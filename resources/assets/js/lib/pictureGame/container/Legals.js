import {connect} from "react-redux";

import LegalsUI from "../ui/Legals";

import {getLegal} from "../actions/legalActions";

const mapStateToProps = (state) => {
    return state.legal;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getLegal());
        }
    };
}

const Legals = connect(
    mapStateToProps,
    mapDispatchToProps
)(LegalsUI);

export default Legals;
