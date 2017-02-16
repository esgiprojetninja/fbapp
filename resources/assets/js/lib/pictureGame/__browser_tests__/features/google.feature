Feature: Admin
    As Nobody
    I should de able to go wherever I want

    Scenario: Get the admin modal an create a contest
        Given I am on Google
        When I fill the element "#lst-ib" with "webdriverio"
        When I wait 3 sec
        Then I should see "WebdriverIO" in a "a"
        When I click on "WebdriverIO - Selenium 2.0 javascript bindings for nodejs"
        When I wait 3 sec
        Then I should see "Webdriver" in a "h1"

    Scenario: Go to the latest doc version
        Given I go on the website "http://webdriver.io/"
        When I click on the element ".dropdown-toggle"
        When I click on "Latest"
        When I wait 4 sec
