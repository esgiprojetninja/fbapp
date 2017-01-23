import $ from "jquery";

export default class ParticipantApi {
    constructor () {
        this.apiBaseUrl = "/api/v1/participants/";
    }

    getInContest (id, callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl+"getInContest",
            data: {id: parseInt(id)}
        }).done(response => {
            callback(response);
        });
    }

    store(photo_id, callback) {
        return $.ajax({
            method: "PUT",
            url: this.apiBaseUrl+photo_id+"/add"
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

    getFromCurrent(callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl + "current"
        }).done(response => {
            callback(response);
        });
    }
}
