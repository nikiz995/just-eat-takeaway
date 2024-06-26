Feature: UI: Use the website to find restaurants
  So that I can order food
  As a hungry customer
  I want to be able to find restaurants in my area

  @UI
  Scenario: Search for restaurants in an area
    Given I Search for restaurant near my area "AR51 1AA"
    And I Navigate to Search Restaurant page
    Then I should see the Cuisine Carousel Items ,Change Location, CuisineSlide bar and FilterSection

  @UI
  Scenario Outline: Verify error message when searching for invalid restaurant names
    When I Search for restaurant "<invalid_restaurants>" under search field
    Then I should see "We're coming up empty, try removing some filters." message is displayed

    Examples:
      | invalid_restaurants |
      | XYZ123              |
      | e@qwe$12321         |

  @UI
  Scenario Outline: Filter and select a menu
    When I Search for restaurant "<valid_restaurants>" under search field
    Then I select the displayed restaurant from the result list
    And I navigate to the Menu Details page
    And I click on a product item
    Then I should see the Item Pop-Up after selecting the product

    Examples:
      | valid_restaurants            |
      | Harry Ramsden Test Menu Demo |

  @UI
  Scenario: User completes the checkout process
    When I increase the item quanity and click on Add to Order button
    Then I should see the menu item added to the cart
    When I click on Go to Checkout button
    Then I should see Checkout page
