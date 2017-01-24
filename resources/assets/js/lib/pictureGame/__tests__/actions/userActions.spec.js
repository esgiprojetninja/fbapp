import $ from "jquery";
import Mockjax from "jquery-mockjax";
import * as actions from "../../actions/userActions";
import * as actionTypes from "../../actions/userTypes";
import AuthApi from "../../API/user/AuthApi";

describe("actions", function () {

    beforeAll(() => {
        const mockjax = Mockjax($, window);
        this.authApi = new AuthApi();
    })

    it("should create an action to request login status", function () {
        const status = true;
        const expectedAction = {
            type: actionTypes.REQUEST_LOGIN_SATUS,
            status
        };
        expect(actions.requestLoginStatus(status)).toEqual(expectedAction);
    });

    it("should create an action to deny login status", () => {
        const status = false;
        const expectedAction = {
            type: actionTypes.RECIEVE_NOT_LOGGED_STATUS,
            status
        };
        expect(actions.recieveNotLoggedStatus()).toEqual(expectedAction);
    });

    it("should create an action that requests login", () => {
        const isFetching = true;
        const expectedAction = {
            type: actionTypes.REQUEST_LOGIN,
            isFetching
        };
        expect(actions.requestLogin()).toEqual(expectedAction);
    });

    it("should create an action that return logged user", () => {
        const data = {toto: "toto"};
        const isFetching = false;
        const expectedAction = {
            type: actionTypes.LOGIN_SUCCESS,
            data,
            isFetching
        };
        expect(actions.loginSuccess(data)).toEqual(expectedAction);
    });

    it("should create an action that return an error on login atempt", () => {
        const error = {error: "damned !"};
        const isFetching = false;
        const expectedAction = {
            type: actionTypes.LOGIN_ERROR,
            error,
            isFetching
        };
        expect(actions.loginError(error)).toEqual(expectedAction);
    });

    it("should request logout", () => {
        const isFetching = true;
        const expectedAction = {
            type: actionTypes.REQUEST_LOGOUT,
            isFetching
        };
        expect(actions.requestLogout()).toEqual(expectedAction);
    });

    it("should logout successfully", () => {
        const isFetching = false;
        const expectedAction = {
            type: actionTypes.LOGOUT_SUCCESS,
            isFetching
        };
        expect(actions.logoutSuccess()).toEqual(expectedAction);
    });

    it("should not logout",  () => {
        const isFetching = false;
        const expectedAction = {
            type: actionTypes.LOGOUT_ERROR,
            error: "Some kind of problem.",
            isFetching: false
        };
        expect(actions.logoutError("Some kind of problem.")).toEqual(expectedAction);
    });
});
