var assert = require("assert");
describe('webdriver.io page', function() {

    it("should have the right title - the fancy generator way", () => {
        browser.url('http://fbapp.dev');
        var title = browser.getTitle();
        assert.equal(title, 'FB APP');
    });
});
