import $ from "jquery";

export default class UserApi {
    constructor () {
        this.baseUrl = "/api/v1/users/";
    }

    getAll (callback) {
        return $.ajax({
            method: "GET",
            url: this.baseUrl
        }).done((response) => {
            callback(response);
        });
    }
}
