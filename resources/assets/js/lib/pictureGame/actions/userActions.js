import * as actionTypes from "./userTypes";
import AuthApi from "../API/user/AuthApi";
import FacebookLoader from "../utils/FacebookLoader";


const authApi = new AuthApi();
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
        authApi.getMe(response => {
            if(response.user) {
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
                window.location.href = "/";
            } else {
                dispatch(logoutError("Error while logged you out"));
            }
        });
    };
}

export const requestAdminStatus = () => {
    return {
        type: actionTypes.REQUEST_ADMIN_STATUS
    };
}

export const recieveIsAdmin = () => {
    return {
        type: actionTypes.RECIEVE_IS_ADMIN
    };
}

export const recieveIsNotAdmin = () => {
    return {
        type: actionTypes.RECIEVE_IS_NOT_ADMIN
    };
}

export const recieveError = (error) => {
    return {
        type: actionTypes.RECIEVE_ERROR,
        error: error
    }
}

export const checkAdminStatus = () => {
    return (dispatch) => {
        dispatch(requestAdminStatus);
        authApi.amIAdmin(response => {
            if(response) {
                dispatch(recieveIsAdmin());
            } else {
                dispatch(recieveIsNotAdmin());
            }
        });
    };
}

const requestPhotoScope = () => {
    return {
        type: actionTypes.REQUEST_PHOTO_SCOPE
    };
}

const grantPhotoScope = () => {
    return {
        type: actionTypes.GRANT_PHOTO_SCOPE
    };
}

const denyPhotoScope = () => {
    return {
        type: actionTypes.DENY_PHOTO_SCOPE
    };
}

export const getPhotoScope = (rerequest = true) => {
    return (dispatch, getState) => {
        dispatch(requestPhotoScope());
        const accessToken = getState().user.data.token;
        if (!getState().user.isConnected) {
            dispatch(denyPhotoScope())
        } else {
            facebookLoader.checkPhotoPermission(accessToken, status => {
                if (status) {
                    dispatch(grantPhotoScope());
                } else {
                    dispatch(denyPhotoScope());
                    if (rerequest === true) {
                        facebookLoader.getPhotoScope(() => {
                            dispatch(getPhotoScope(false));
                        });
                    }
                }
            });
        }
    };
}
