Feature: Home feature
    As a not logged user
    I should be able to log in with Facebook

    Scenario: Get the navbar
        Given I am on the homepage
        When I click on the element ".navbar-mui-open-wrapper"
        Then I should see the element ".navbar-mui"

    Scenario: Connect as a user
        Given I am on the homepage
        When I click on the element ".navbar-mui-open-wrapper"
        Then I should see the element ".navbar-mui"
        When I click on the element ".login-btn"
        When I wait 3 sec
        Then I should see "Se connecter à Facebook" in a "span"
        When I fill the element "#email" with "mmhghcmpwq_1484920886@tfbnw.net"
        When I fill the element "#pass" with "esgininja1"
        When I submit "#login_form"
        When I wait 3 sec
        Then the title of the page should be "FB APP"
