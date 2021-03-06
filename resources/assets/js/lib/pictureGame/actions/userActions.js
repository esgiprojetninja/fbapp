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
                dispatch(getCurrentPhotoPermissions());
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
    console.warn(error); // TODO remove this on prod
    return {
        type: actionTypes.RECIEVE_ERROR,
        error: error
    }
}

export const checkAdminStatus = () => {
    return (dispatch) => {
        dispatch(requestAdminStatus);
        authApi.amIAdmin(response => {
            if(response.admin) {
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
            facebookLoader.setPlayerScope(true);
            facebookLoader.checkPermissions(accessToken, (status) => {
                if (status) {
                    dispatch(grantPhotoScope());
                } else {
                    dispatch(denyPhotoScope());
                    if (rerequest === true) {
                        facebookLoader.login(() => {
                            // TODO: when user removes permissions but stays logged in the app and then re-accepts the permissions the token is not updated and causes code breaking throughout the app
                            dispatch(getPhotoScope(false));
                        });
                    }
                }
            });
        }
    };
}

export const getCurrentPhotoPermissions = () => {
    return (dispatch, getState) => {
        const accessToken = getState().user.data.token;
        dispatch(requestPhotoScope());
        facebookLoader.setPlayerScope(true);
        facebookLoader.checkPermissions(accessToken, status => {
            if (status) {
                dispatch(grantPhotoScope());
            } else {
                dispatch(denyPhotoScope());
            }
        })
    }
}

const receiveFbAlbums = (res) => {
    return {
        type: actionTypes.RECEIVE_FB_ALBUMS,
        isFetching: false,
        albums: res.data
    };
}
const requestFbAlbums = () => {
    return {
        type: actionTypes.REQUEST_FB_ALBUMS
    };
}
export const getFbAlbums = () => {
    return (dispatch, getState) => {
        if ( getState().user.albums.length > 0 ) {
          dispatch(receiveFbAlbums({data: getState().user.albums}));
        } else{
          const accessToken = getState().user.data.token
          dispatch(requestFbAlbums())
          facebookLoader.getMyAlbums(
              accessToken,
              (response) => {
                  if (response.error) {
                      dispatch(recieveError(response.error.message));
                  } else {
                      dispatch(receiveFbAlbums(response));
                  }
              }
          );
        }
    }
}

const receiveFbAlbumPhotos = ({response, album_id}) => {
    const _next = ( response.paging && response.paging.next ) ? response.paging.next : false;
    return {
        type: actionTypes.RECEIVE_FB_ALBUM_PHOTOS,
        isFetching: false,
        album_id,
        photos: response.data,
        next: _next
    };
}
const requestFbAlbumPhotos = () => {
    return {
        type: actionTypes.REQUEST_FB_ALBUM_PHOTOS
    };
}
export const getFbAlbumPhotos = (album_id) => {
    return (dispatch, getState) => {
      const aimedAlbum = getState().user.albums.filter( alb => alb.id === album_id );
        if ( aimedAlbum[0] && aimedAlbum[0].photos ) {
          dispatch(receiveFbAlbumPhotos({response: { ...aimedAlbum[0], data: aimedAlbum[0].photos, paging:{next:aimedAlbum[0].next} }, album_id}));
        } else {
          const accessToken = getState().user.data.token
          dispatch(requestFbAlbumPhotos())
          facebookLoader.getAlbumPhotos(
              accessToken,
              album_id,
              (response) => {
                  if (response.error) {
                      dispatch(recieveError(response.error.message));
                  } else {
                      dispatch(receiveFbAlbumPhotos({response, album_id}));
                  }
              }
          );
        }
    }
}

const receiveMoreFbAlbumPhotos = ({response, album_id}) => {
    return {
        type: actionTypes.RECEIVE_MORE_FB_ALBUM_PHOTOS,
        isFetching: false,
        album_id,
        photos: response.data,
        next: response.paging.next || false
    }
}
const requestMoreFbAlbumPhotos = () => {
    return {
        type: actionTypes.REQUEST_MORE_FB_ALBUM_PHOTOS
    }
}

export const getMoreFbAlbumPhotos = (link, album_id) => {
    return (dispatch, getState) => {
        dispatch(requestMoreFbAlbumPhotos())
        facebookLoader.getMoreAlbumPhotos(
            link,
            (response) => {
                if (response.error) {
                    dispatch(recieveError(response.error.message));
                } else {
                    dispatch(receiveMoreFbAlbumPhotos({response, album_id}));
                }
            }
        )
    }
}
