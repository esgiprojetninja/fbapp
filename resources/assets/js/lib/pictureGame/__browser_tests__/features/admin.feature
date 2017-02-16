Feature: Admin
    As an admin
    I should be able to log in and manage contests

    Scenario: Get the admin modal an create a contest
        Given I am on the homepage
        When I click on the element ".navbar-mui-open-wrapper"
        Then I should see the element ".navbar-mui"
        When I click on the element ".login-btn"
        When I wait 3 sec
        Then I should see "Se connecter à Facebook" in a "span"
        When I fill the element "#email" with "renaud.bellec.3@gmail.com"
        When I fill the element "#pass" with "ilarriveapiedparlachine"
        When I submit "#login_form"
        When I wait 3 sec
        Then the title of the page should be "FB APP"
        When I wait 3 sec
        When I click on the element ".navbar-mui-open-wrapper"
        Then I should see the element ".navbar-mui"
        When I click on the element ".admin-main-btn"
        When I wait 3 sec
        When I click on "Paramètres"
        When I fill the element "#title" with "TOTO"
        When I submit "create_contest"
        Then I should see "TOTO"
