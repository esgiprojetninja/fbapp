import FacebookLoader from "./FacebookLoader";
import * as actionTypes from "./actionTypes";


/* Wait FB global before starting app */
const facebookLoader = new FacebookLoader();

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
        return facebookLoader.getLoginStatus((response) => {
            if (response.status === "connected") {
                facebookLoader.checkPermissions(granted => {
                    if (granted) {
                        facebookLoader.getMe((me) => {
                            dispatch(loginSuccess(me));
                        });
                    } else {
                        dispatch(login());
                    }
                })
            } else {
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

export const login = (status) => {
    return (dispatch) => {
        if (status) {
            return dispatch(loginError("You are already logged in"));
        }
        dispatch(requestLogin());
        return facebookLoader.login((response) => {
            dispatch(loginSuccess(response));
        });
    };
}

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
        return facebookLoader.logout(() => {
            dispatch(logoutSuccess());
        });
    };
}
