import {combineReducers} from "redux";
import {
    REQUEST_LOGIN_SATUS,
    RECIEVE_NOT_LOGGED_STATUS,
    REQUEST_LOGIN,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    REQUEST_LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR
} from "./actions";

const user = (state = {}, action) => {
        switch (action.type) {
            case REQUEST_LOGIN_SATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: true
                };
            case RECIEVE_NOT_LOGGED_STATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: false,
                    data: {}
                };
            case REQUEST_LOGIN:
                return {
                    ...state,
                    isFetching: true
                };
            case LOGIN_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isConnected: true,
                    data: action.data
                };
            case LOGIN_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: action.error
                };
            case REQUEST_LOGOUT:
                return {
                    ...state,
                    isFetching: true
                };
            case LOGOUT_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isConnected: false,
                    data: {}
                };
            case LOGOUT_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: action.error
                };
            default:
                return state;
        }
}

const pictureGameReducers = combineReducers({user});

export default pictureGameReducers;
