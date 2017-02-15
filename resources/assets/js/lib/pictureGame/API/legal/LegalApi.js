import $ from "jquery";

export default class LegalApi {
    constructor () {
        this.baseUrl = "/api/v1/legals/";
    }

    getLast (callback) {
        return $.ajax({
            method: "GET",
            url: this.baseUrl
        }).done(response => {
            callback(response);
        });
    }

    save (data, callback) {
        return $.ajax({
            method: "POST",
            url: this.baseUrl,
            data
        }).done(response => {
            callback(response);
        });
    }
}
