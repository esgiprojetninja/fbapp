import {combineReducers} from "redux";
import * as actionTypes from "./actionTypes";

const user = (state = {}, action) => {
        switch (action.type) {
            case actionTypes.REQUEST_LOGIN_SATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: true
                };
            case actionTypes.RECIEVE_NOT_LOGGED_STATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: false,
                    data: {}
                };
            case actionTypes.REQUEST_LOGIN:
                return {
                    ...state,
                    isFetching: true
                };
            case actionTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isConnected: true,
                    data: action.data
                };
            case actionTypes.LOGIN_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: action.error
                };
            case actionTypes.REQUEST_LOGOUT:
                return {
                    ...state,
                    isFetching: true
                };
            case actionTypes.LOGOUT_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isConnected: false,
                    data: {}
                };
            case actionTypes.LOGOUT_ERROR:
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
