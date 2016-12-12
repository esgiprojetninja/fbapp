import {combineReducers} from "redux";
import * as loginTypes from "../actions/loginTypes";

const initialSate = {
    user : {
        isConnected: false,
        isFetching: false,
        data: {}
    }
};

export const user = (state = initialSate.user, action) => {
        switch (action.type) {
            case loginTypes.REQUEST_LOGIN_SATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: true
                };
            case loginTypes.RECIEVE_NOT_LOGGED_STATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: false,
                    data: {}
                };
            case loginTypes.REQUEST_LOGIN:
                return {
                    ...state,
                    isFetching: true
                };
            case loginTypes.LOGIN_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isConnected: true,
                    data: action.data
                };
            case loginTypes.LOGIN_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: action.error
                };
            case loginTypes.REQUEST_LOGOUT:
                return {
                    ...state,
                    isFetching: true
                };
            case loginTypes.LOGOUT_SUCCESS:
                return {
                    ...state,
                    isFetching: false,
                    isConnected: false,
                    data: {}
                };
            case loginTypes.LOGOUT_ERROR:
                return {
                    ...state,
                    isFetching: false,
                    error: action.error
                };
            default:
                return state;
        }
}

const loginReducer = combineReducers({user});

export default loginReducer;
