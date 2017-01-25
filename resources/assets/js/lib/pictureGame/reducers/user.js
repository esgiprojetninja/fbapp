import * as types from "../actions/userTypes";

const initialSate = {
    user : {
        isConnected: false,
        isFetching: false,
        isAdmin: false,
        data: {},
        photos: [],
        albums: [],
    }
};

const user = (state = initialSate.user, action) => {
  switch (action.type) {
    case types.REQUEST_LOGIN_SATUS:
      return {
        ...state,
        isConnected: action.status,
        isFetching: true
      };
    case types.RECIEVE_NOT_LOGGED_STATUS:
      return {
        ...state,
        isConnected: action.status,
        isFetching: false
      };
    case types.REQUEST_LOGIN:
      return {
        ...state,
        isFetching: true
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isConnected: true,
        data: action.data
      };
    case types.LOGIN_ERROR:
      return {
          ...state,
          isFetching: false,
          error: action.error
      };
    case types.REQUEST_LOGOUT:
      return {
        ...state,
        isFetching: true
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isConnected: false,
        data: {}
      };
    case types.LOGOUT_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case types.REQUEST_ADMIN_STATUS:
      return {
        ...state,
        isFetching: true,
        isAdmin: false
      }
    case types.RECIEVE_IS_ADMIN:
      return {
        ...state,
        isFetching: false,
        isAdmin: true
      }
    case types.RECIEVE_IS_NOT_ADMIN:
      return {
        ...state,
        isFetching: false,
        isAdmin: false
      }
    case types.RECIEVE_ERROR:
      return {
        ...state,
        isFetching: false,
        isAdmin: false,
        error: action.error
      }
    case types.REQUEST_PHOTO_SCOPE:
      return {
        ...state,
        isFetching: true,
        photoScopeGranted: false
      }
    case types.GRANT_PHOTO_SCOPE:
      return {
        ...state,
        isFetching: false,
        photoScopeGranted: true
      }
    case types.DENY_PHOTO_SCOPE:
      return {
        ...state,
        isFetching: false,
        photoScopeGranted: false
      }
    case types.REQUEST_PHOTO_SCOPE:
      return {
        ...state,
        isFetching: true,
      }
    case types.RECEIVE_FB_ALBUMS:
      return {
        ...state,
        isFetching: false,
        albums: [
            ...action.albums
        ]
      }
    case types.REQUEST_FB_ALBUMS:
      return {
        ...state,
        isFetching: true
      }
    case types.RECEIVE_FB_ALBUM_PHOTOS:
      const s = {...state};
      state.albums.map( (album, key) => {
        if (album.id == action.album_id) {
          s.albums[key] = {...state.albums[key], photos: action.photos, next: action.next}
        } else if ( album.photos ) {
          delete s.albums[key].photos;
        }
      } );
      return {
        ...s,
        isFetching: false
      }
    case types.REQUEST_FB_ALBUM_PHOTOS:
      return {
        ...state,
        isFetching: true
      }
    case types.REQUEST_MORE_FB_ALBUM_PHOTOS:
      return {
        ...state,
        isFetching: true
      }
    case types.RECEIVE_MORE_FB_ALBUM_PHOTOS:
      const oldState = {...state};
      state.albums.map( (album, key) => {
        if (album.id == action.album_id) {
          oldState.albums[key].photos = state.albums[key].photos.concat(action.photos);
          oldState.albums[key].next = action.morePhotosLink;
        } else if ( album.photos ) {
          delete oldState.albums[key].photos;
          if ( oldState.albums[key].next ) { delete oldState.albums[key].next; }
        }
      } );
      return {
        ...oldState,
        isFetching: false
      }
    default:
      return state;
  }
}
export default user;
