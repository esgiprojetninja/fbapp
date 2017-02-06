import {connect} from "react-redux";
import {
    changeMainColor
} from "../actions/contestActions";
import AppNavBarComponent from "../ui/AppNavBar";

const mapStateToProps = (state) => {
    return state.contest;
}

const mapDispatchToProps = (dispatch) => {
    return {
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
