import {connect} from "react-redux";
import {
    checkLoginStatus,
    login,
    logout
} from "../actions/loginActions";
import Loginfb from "../ui/LoginFb";

const mapStateToProps = (state) => {
    // TODO : move this upper
    if (!state.user.isConnected && !state.user.isFetching) {
        return {
            ...state.user,
            isConnected: false,
            isFetching: false,
            data: {}
        }
    }
    return state.user;
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: (status) => {
            dispatch(checkLoginStatus(status));
        },
        onLogoutClicked: (status) => {
            dispatch(logout(status));
        },
        onLoginClicked: (status) => {
            window.location.href = "auth/facebook";
        }
    };
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loginfb);

export default Login;
