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
}
