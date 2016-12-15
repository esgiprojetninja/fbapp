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

    create(data, callback) {
        console.debug(data);
        return $.ajax({
            methos: "GET",
            url: this.apiBaseUrl + "create",
            data: data
        }).done(response => {
            callback(response);
        });
    }
}
