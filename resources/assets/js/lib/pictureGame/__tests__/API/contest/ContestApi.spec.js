import $ from "jquery";
import Mockjax from "jquery-mockjax";
import ContestApi from "../../../API/contest/ContestApi";

describe("Contest API", function () {

    beforeAll(function () {
        this.contestApi = new ContestApi();
        const mockjax = Mockjax($, window);
    });

    afterEach(function () {
        $.mockjax.clear();
    })

    it("should return a list of contests", function (done) {
        $.mockjax({
            url: this.contestApi.apiBaseUrl,
            responseText: [{id: 1},{id: 2},{id: 3}]
        });
        this.contestApi.getAll(r => {
            expect(r.length).toBe(3);
            done();
        });
    });

    it("should store a contest", function (done) {
        $.mockjax({
            url: this.contestApi.apiBaseUrl,
            method: "POST",
            responseText: {
                saved: true
            }
        })
        this.contestApi.store({id: 3}, (r) => {
            expect(r.saved).toBe(true);
            done();
        });
    });

    it("should delete a contest", function (done) {
        $.mockjax({
            url: this.contestApi.apiBaseUrl + "2",
            method: "DELETE",
            responseText: {
                deleted: true
            }
        })
        this.contestApi.delete(2, (r) => {
            expect(r.deleted).toBe(true);
            done();
        });
    });

    it("should activate a contest", function (done) {
        $.mockjax({
            url: this.contestApi.apiBaseUrl + "2/activate",
            method: "PUT",
            responseText: {
                activated: true
            }
        })
        this.contestApi.activate(2, (r) => {
            expect(r.activated).toBe(true);
            done();
        });
    });

    it("should return the current contest", function (done) {
        $.mockjax({
            url: this.contestApi.apiBaseUrl + "current",
            responseText: {
                id: 3
            }
        })
        this.contestApi.getCurrent((r) => {
            expect(r.id).toBe(3);
            done();
        });
    });

});
