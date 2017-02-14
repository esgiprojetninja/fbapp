import $ from "jquery";

export default class ParticipantApi {
    constructor () {
        this.apiBaseUrl = "/api/v1/participants/";
    }

    getInContest (id, callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl + "getInContest",
            data: {id: parseInt(id)}
        }).done(response => {
            callback(response);
        });
    }

    store(photo_id, publishAuthorization = false, callback) {
        console.debug("about to ajax the fuck out with authoraization set to :" , publishAuthorization)
        return $.ajax({
            method: "PUT",
            url: this.apiBaseUrl + photo_id + "/add",
            data: {publishAuthorization}
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

    deleteFromCurrent({user_id, contest_id}, callback) {
        return $.ajax({
            method: "POST",
            url: this.apiBaseUrl + "deleteFromCurrent",
            data:{user_id, contest_id}
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

    getCurrentParticipant(callback) {
        return $.ajax({
            method: "GET",
            url: this.apiBaseUrl + "current-participant"
        }).done(response => {
            callback(response);
        });
    }

    saveVote(data, callback) {
        return $.ajax({
            method: "PUT",
            url: this.apiBaseUrl + data.id,
            data: data
        }).done(response => {
            callback(response);
        });
    }

    getPublishPreview(callback) {
      return $.ajax({
          method: "GET",
          url: this.apiBaseUrl + "publish-preview"
      }).done(response => {
          callback(response);
      });
    }
}
