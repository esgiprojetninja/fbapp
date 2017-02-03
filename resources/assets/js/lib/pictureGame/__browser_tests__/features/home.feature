Feature: Example feature
    As a not logged user
    I should be able to get the navbar

    Scenario: Get the navbar
        Given I am on the homepage
        When I click on the element ".navbar-mui-open-wrapper"
        Then I should see the element ".navbar-mui"
