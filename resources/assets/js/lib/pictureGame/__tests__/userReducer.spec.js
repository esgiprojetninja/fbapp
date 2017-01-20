import {user as userReducer} from "../reducers/user";
import * as actionTypes from "../actions/userTypes";

describe("Reducers", () => {

    it("should return initial state", () => {
        expect(
            userReducer(undefined, {})
        ).toEqual({
            user : {
                isConnected: false,
                isFetching: false,
                data: {}
            }
        });
    });
});
