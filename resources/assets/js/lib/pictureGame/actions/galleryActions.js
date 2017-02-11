import * as types from "./galleryTypes";

export const closePhoto = () => {
    return {
        type: types.CLOSE_PHOTO
    }
}

export const openPhoto = (participant_id) => {
    return (dispatch, getState) => {
        return {
            type: types.OPEN_PHOTO,
            photo: getState().contest.currentContest.participants.find( (p) => p.id === participant_id )
        }
    }
}
