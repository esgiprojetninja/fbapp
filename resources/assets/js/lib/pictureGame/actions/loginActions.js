import FacebookLoader from "../FacebookLoader";
import * as actionTypes from "./loginTypes";
import AuthApi from "../API/user/authApi";


const facebookLoader = new FacebookLoader();
const authApi = new AuthApi();

export const requestLoginStatus = (status) => {
    return {
        type: actionTypes.REQUEST_LOGIN_SATUS,
        status: status
    };
};

export const recieveNotLoggedStatus = () => {
    return {
        type: actionTypes.RECIEVE_NOT_LOGGED_STATUS,
        status: false
    };
};

export const checkLoginStatus = (status) => {
    return (dispatch) => {
        dispatch(requestLoginStatus(status));
        authApi.getMe(response => {
            if(response.user.id) {
                dispatch(loginSuccess(response.user));
            }
            else {
                dispatch(recieveNotLoggedStatus());
            }
        });
    };
}

// TODO : handle errors on checkLoginStatus

export const requestLogin = () => {
    return {
        type: actionTypes.REQUEST_LOGIN,
        isFetching: true
    };
}

export const loginSuccess = (data) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        data: data,
        isFetching: false
    };
}

export const loginError = (error) => {
    return {
        type: actionTypes.LOGIN_ERROR,
        error: error,
        isFetching: false
    };
}

// export const login = (status) => {
//     return (dispatch) => {
//         if (status) {
//             return dispatch(loginError("You are already logged in"));
//         }
//         dispatch(requestLogin());
//         authApi.getMe((response) => {
//             dispatch(loginSuccess(response.user));
//         });
//     };
// }

export const requestLogout = () => {
    return {
        type: actionTypes.REQUEST_LOGOUT,
        isFetching: true
    };
}

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
        isFetching: false
    };
}

export const logoutError = (error) => {
    return {
        type: actionTypes.LOGOUT_ERROR,
        error: error,
        isFetching: false
    };
}

export const logout = (status) => {
    return (dispatch) => {
        if (!status) {
            return dispatch(logoutError("You are not logged in !"));
        }
        dispatch(requestLogout());
        authApi.logout(response => {
            if (response.logged_out === true) {
                dispatch(logoutSuccess());
            } else {
                dispatch(logoutError("Error while logged you out"));
            }
        });
    };
}
