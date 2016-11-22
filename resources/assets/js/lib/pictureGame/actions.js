import FacebookLoader from "./FacebookLoader";


/* Wait FB global before starting app */
const facebookLoader = new FacebookLoader();

export const REQUEST_LOGIN_SATUS = "REQUEST_LOGIN_SATUS";
export const requestLoginStatus = (status) => {
    return {
        type: REQUEST_LOGIN_SATUS,
        status: status
    };
};

export const RECIEVE_NOT_LOGGED_STATUS = "RECIEVE_NOT_LOGGED_STATUS";
export const recieveNotLoggedStatus = () => {
    return {
        type: RECIEVE_NOT_LOGGED_STATUS,
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

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const requestLogin = () => {
    return {
        type: REQUEST_LOGIN,
        isFetching: true
    };
}

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const loginSuccess = (data) => {
    return {
        type: LOGIN_SUCCESS,
        data: data,
        isFetching: false
    };
}

export const LOGIN_ERROR = "LOGIN_ERROR";
export const loginError = (error) => {
    return {
        type: LOGIN_ERROR,
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

export const REQUEST_LOGOUT = "REQUEST_LOGOUT";
export const requestLogout = () => {
    return {
        type: REQUEST_LOGOUT,
        isFetching: true
    };
}

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    };
}

export const LOGOUT_ERROR = "LOGOUT_ERROR";
export const logoutError = (error) => {
    return {
        type: LOGOUT_ERROR,
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
