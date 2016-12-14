import types from "./adminTypes";
import AdminApi from "../API/user/AdminApi";

const adminApi = new AdminApi();

export const requestAdminStatus = () => {
    return {
        type: types.REQUEST_ADMIN_STATUS
    };
}

export const recieveIsAdmin = () => {
    return {
        type: types.RECIEVE_IS_ADMIN
    };
}

export const recieveIsNotAdmin = () => {
    return {
        type: types.RECIEVE_IS_NOT_ADMIN
    };
}

export const recieveError = (error) => {
    return {
        type: types.RECIEVE_ERROR,
        error: error
    }
}

export const checkAdminStatus = () => {
    return (dispatch) => {
        dispatch(requestAdminStatus);
        authApi.amIAdmin(response => {
            if(respone.isAdmin) {
                dispatch(recieveIsAdmin());
            } else {
                dispatch(recieveIsNotAdmin());
            }
        });
    };
}
