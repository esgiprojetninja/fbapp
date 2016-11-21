import {combineReducers} from "redux";
import {
    REQUEST_LOGIN_SATUS,
    RECIEVE_LOGIN_STATUS
} from "./actions";

const user = (state = {}, action) => {
        switch (action.type) {
            case REQUEST_LOGIN_SATUS:
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: true
                };
            case RECIEVE_LOGIN_STATUS:
                console.debug(state);
                return {
                    ...state,
                    isConnected: action.status,
                    isFetching: false
                }
            default:
                return state;
        }
}

const pictureGameReducers = combineReducers({user});

export default pictureGameReducers;
