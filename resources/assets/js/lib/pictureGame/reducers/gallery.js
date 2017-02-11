import * as gTypes from "../actions/galleryTypes";

const initialSate = {
    open: false,
    consultedPhoto: false
};

const gallery = (state = initialSate, action) => {
    switch (action.type) {
        case gTypes.OPEN_PHOTO:
            return {
                ...state,
                consultedPhoto: {...action.photo},
                open: true
        };
        case gTypes.CLOSE_PHOTO:
            return {
                ...state,
                open: false
        };
        default:
            return state;
    }
};

export default gallery;
