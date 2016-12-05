import {user as userReducer} from "../reducers";
import * as actionTypes from "../actionTypes";

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
