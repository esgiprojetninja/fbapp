import $ from "jquery";

export default class UISettingsApi {
    constructor () {
        this.apiBaseUrl = "/api/v1/uisettings/";
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
}
