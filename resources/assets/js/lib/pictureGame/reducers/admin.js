import * as types from "../actions/adminTypes";

const admin = (state, action) => {
    switch(action.type) {
        case types.REQUEST_ADMIN_STATUS:
            return {
                ...state,
                isFetching: true,
                isAdmin: false;
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
        default:
            return state
    }
}

export default admin;
