import $ from "jquery";
import Mockjax from "jquery-mockjax";
import AuthApi from "../../../API/user/AuthApi";

describe("Auth API", function () {

    beforeAll(function () {
        const mockjax = Mockjax($, window);
    })

    beforeEach(function () {
        this.authapi = new AuthApi();
        $.mockjax([
            {
                url: this.authapi.authBaseUrl + "logout",
                responseText: "ok"
            },
            {
                url: this.authapi.authBaseUrl + "me",
                responseText: {
                    user: "Rolandkuku"
                }
            },
            {
                url: this.authapi.authBaseUrl + "isAdmin",
                responseText: "YES"
            }
        ]);
    })

    it("sould logout", function (done) {
        this.authapi.logout(r => {
            expect(r).toBe("ok");
            done();
        });
    });

    it("sould get me", function (done) {
        this.authapi.getMe(r => {
            expect(r.user).toBe("Rolandkuku");
            done();
        });
    });

    it("sould determine if I am admin", function (done) {
        this.authapi.amIAdmin(r => {
            expect(r).toBe("YES");
            done();
        });
    });
});
