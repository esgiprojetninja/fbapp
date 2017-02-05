import * as types from "./noticeTypes";

export const closeNotice = () => {
    return {
        type: types.CLOSE_NOTICE
    }
}

export const openNotice = () => {
    return {
        type: types.OPEN_NOTICE
    }
}
