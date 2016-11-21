import {connect} from "react-redux";
import {checkLoginStatus} from "../actions";
import Loginfb from "../ui/LoginFb";
import FacebookLoader from "../FacebookLoader";


const mapStateToProps = (state) => {
    if (!state.user.isConnected) {
        return {
            user: {
                isConnected: false,
                isFetching: false
            }
        };
    }
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onReady: () => {
            dispatch(checkLoginStatus());
        }
    };
}

const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(Loginfb);

export default Login;
