var assert = require("assert"),
    tmpResult;
var expect = require("expect");

module.exports = function(){

    this.Given(/^I go on the website "([^"]*)"$/, function(url) {
        browser.url(url);
    });

    this.Given(/^I am on the homepage$/, function (url) {
        browser.url("https://esgi.ninja");
        var title = $(".home-carousel-button");
        title.waitForVisible(5000);
        browser.screenshot();
    });

    this.Given(/^I am on Google/, function (url) {
        browser.url("https://www.google.fr");
    });

    this.When(/^I click on the element "([^"]*)"$/, function (selector) {
        var element = browser.click(selector);
    });

    this.When(/^I click on "([^"]*)"$/, function (selector) {
        var element = browser.click("*=" + selector);
    });

    this.When(/^I click on the button "([^"]*)"$/, function (selector) {
        console.log(browser.element("button").element("span").getText("*=" + selector));
        var element = browser.click('*=' + selector);
    });

    this.When(/^I fill the element "([^"]*)" with "([^"]*)"$/, function (selector, value) {
        browser.setValue(selector, value);
    });

    this.When(/^I submit "([^"]*)"$/, function (selector) {
        browser.submitForm(selector);
    });

    this.When(/^I wait (\d+) sec$/, function (seconds) {
        var waitedEnough = false;
        setTimeout(function() {
            waitedEnough = true;
        }, seconds * 1000);
        browser.waitUntil(function () {
            return waitedEnough == true;
        }, seconds * 1000 + 1000);
    });

    this.Then(/^I should see "([^"]*)" in a "([^"]*)"/, function (text, element) {
        browser.getText(element + "*=" + text);
    });

    this.Then(/^I should see the element "([^"]*)"$/, function (selector) {
        var element = $(selector);
        element.waitForVisible(3000);
    });

    this.Then(/^should the element "([^"]*)" be (\d+)px wide and (\d+)px high$/, function(selector, width, height) {
        var elemSize = browser.getElementSize(selector);
        assert.equal(elemSize.width, width, 'width of element is ' + elemSize.width + ' but should be ' + width);
        assert.equal(elemSize.height, height, 'height of element is ' + elemSize.height + ' but should be ' + height);
    });

    this.Then(/^the title of the page should be "([^"]*)"$/, function(expectedTitle) {
        var title = browser.getTitle();
        assert.equal(title, expectedTitle, ' title is "'+ title + '" but should be "'+ expectedTitle);
    });
};
