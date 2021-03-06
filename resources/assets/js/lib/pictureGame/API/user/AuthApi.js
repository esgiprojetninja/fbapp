import $ from "jquery";

export default class AuthApi {
    constructor () {
        this.authBaseUrl = "/api/v1/auth/";
    }

    logout (callback) {
        return $.ajax({
            method: "GET",
            url: this.authBaseUrl + "logout"
        }).done(response => {
            callback(response);
        })
    }

    getMe (callback) {
        return $.ajax({
            method: "GET",
            url: this.authBaseUrl + "me"
        }).done(response => {
            callback(response);
        })
    }

    amIAdmin (callback) {
        return $.ajax({
            method: "GET",
            url: this.authBaseUrl + "isAdmin"
        }).done(response => {
            callback(response);
        })
    }
}
