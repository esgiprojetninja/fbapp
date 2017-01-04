import $ from "jquery";

export default class ContestApi {
    constructor () {
        this.apiBaseUrl = "/api/v1/contests/";
    }

    getAll (callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl
        }).done(response => {
            callback(response);
        });
    }

    store(data, callback) {
        return $.ajax({
            method: "POST",
            url: this.apiBaseUrl,
            data: data
        }).done(response => {
            callback(response);
        });
    }

    delete(id, callback) {
        return $.ajax({
            method: "DELETE",
            url: this.apiBaseUrl + id
        }).done(response => {
            callback(response);
        });
    }

    activate(id, callback) {
        return $.ajax({
            method: "PUT",
            url: this.apiBaseUrl + id + "/activate"
        }).done(response => {
            callback(response);
        });
    }

    getCurrent(callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl + "current"
        }).done(response => {
            callback(response);
        });
    }
}
