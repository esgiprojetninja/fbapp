import * as types from "./galleryTypes";

export const closePhoto = () => {
    return {
        type: types.CLOSE_PHOTO
    }
}

const switchToPhoto = (photo) => {
    return {
        type: types.OPEN_PHOTO,
        photo
    }
}

export const openPhoto = (participant_id) => {
    return (dispatch, getState) => {
        dispatch(switchToPhoto(getState().contest.currentContest.participants.find( (p) => p.id === participant_id)));
    }
}
