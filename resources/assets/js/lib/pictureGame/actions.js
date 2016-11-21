import FacebookLoader from "./FacebookLoader";
import fetch from "isomorphic-fetch";

export const CONNECT_USER = "CONNECT_USER";

/* Wait FB global before starting app */
const facebookLoader = new FacebookLoader();

export const REQUEST_LOGIN_SATUS = "REQUEST_LOGIN_SATUS";
export const requestLoginStatus = (status) => {
    return {
        type: REQUEST_LOGIN_SATUS,
        status: status
    };
};

export const RECIEVE_LOGIN_STATUS = "RECIEVE_LOGIN_STATUS";
export const recieveLoginStatus = (status) => {
    return {
        type: RECIEVE_LOGIN_STATUS,
        status: status
    };
};

export const checkLoginStatus = (status) => {
    return (dispatch) => {
        dispatch(requestLoginStatus(status));
        return facebookLoader.getLoginStatus((response) => {
            dispatch(recieveLoginStatus(
                response.status === "connected" ? true : false
            ));
        });
    }
}
