import $ from "jquery";

export default class AdminApi {
    constructor () {
        this.apiBaseUrl = "/api/v1/admin/";
    }

    amIAdmin (callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl + "isAdmin"
        }).done(response => {
            callback(response);
        });
    }
}
