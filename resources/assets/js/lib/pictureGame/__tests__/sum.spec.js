import {
    REQUEST_LOGIN_SATUS,
    requestLoginStatus
} from "../actions";

describe("actions", () => {
    it("should create an action to request login status", () => {
        const status = true;
        const expectedAction = {
            type: REQUEST_LOGIN_SATUS,
            status
        };
        expect(requestLoginStatus(status)).toEqual(expectedAction);
    });
});
