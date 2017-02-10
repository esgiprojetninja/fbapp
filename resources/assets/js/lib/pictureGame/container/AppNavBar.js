import {connect} from "react-redux";
import {
    changeMainColor,
    getUISettings
} from "../actions/contestActions";
import AppNavBarComponent from "../ui/AppNavBar";

const mapStateToProps = (state) => {
    return state.contest;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(getUISettings());
        },
        onChangeColor: (color) => {
            dispatch(changeMainColor(color));
        }
    }
}

const AppNavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(AppNavBarComponent);

export default AppNavBar;
