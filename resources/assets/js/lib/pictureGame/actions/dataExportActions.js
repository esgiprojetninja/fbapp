import * as types from "./dataExportTypes";
import UserApi from "../API/user/UserApi";

const userApi = new UserApi();

const requestUserList = () => {
    return {
        type: types.REQUEST_USER_LIST
    };
}

const receiveUserList = (list) => {
    return {
        type: types.RECEIVE_USER_LIST,
        userList: list
    };
}

const receiveError = (errorMsg) => {
    return {
        type: type.RECEIVE_ERROR,
        errorMsg: errorMsg
    };
}

export const getUserList = () => {
    return (dispatch) => {
        dispatch(requestUserList());
        userApi.getAll(response => {
            if (response.error) {
                dispatch(receiveError(response.error_msg));
            }
            else {
                dispatch(receiveUserList(response.user_list));
            }
        });
    }
}
