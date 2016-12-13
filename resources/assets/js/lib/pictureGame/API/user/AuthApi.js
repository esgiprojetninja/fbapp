import $ from "jquery";

export default class AuthApi {
    constructor () {
        this.authBaseUrl = "/api/v1/auth/";
    }

    login (data, callback) {
        return $.ajax({
            method: "POST",
            url: this.authBaseUrl + "login",
            data: data
        }).done(response => {
            callback(response);
        });
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
}
