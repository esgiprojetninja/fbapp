import * as types from "../actions/dataExportTypes";

const initialSate = {
    userList: [],
    isFetching: false,
    error: false,
    errorMsg: ""
};

const dataExport = (state = initialSate, action) => {
    switch(action.type) {
        case types.REQUEST_USER_LIST:
            return {
                ...state,
                isFetching: true
            };
        case types.RECEIVE_USER_LIST:
            return {
                ...state,
                userList: action.userList,
                isFetching: false
            };
        case types.RECEIVE_ERROR:
            return {
                ...state,
                error: true,
                errorMsg: action.errorMsg,
                isFetching: false
            };
        default:
            return state;
    }
}
export default dataExport;
