import user from "../reducers/user";
import * as actionTypes from "../actions/userTypes";

describe("Reducers", () => {

    it("should return initial state", () => {
        expect(
            user(undefined, {})
        ).toEqual({
            isConnected: false,
            isFetching: false,
            isAdmin: false,
            data: {},
            photos: [],
            loadMoreFbPhotosLink: ""
        });
    });
});
