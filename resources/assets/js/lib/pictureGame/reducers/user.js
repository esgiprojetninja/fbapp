import * as types from "../actions/userTypes";

const initialSate = {
    user : {
        isConnected: false,
        isFetching: false,
        data: {}
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
                    isFetching: false,
                    data: {}
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
            default:
                return state;
        }
}

export default user;
