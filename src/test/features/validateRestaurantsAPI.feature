Feature: Restaurant Data Validation and Retrieval

  @api
  Scenario: Validate the address schema for each restaurant
    Given I fetch restaurant data for the postcode "AR51 1AA"
    Then each restaurant should have a valid address

  @api
  Scenario: Validate star ratings for restaurants
    Then all restaurants with no ratings should have a star rating of 0
    And all restaurants with more than 1 rating should have a star rating greater than 0

  @api
  Scenario: Validate whether restaurant data has a valid URL
    Then at least one restaurant should have a valid URL

  @api
  Scenario: Validate top 5 restaurants are sorted by shortest delivery time
    Given I fetch restaurant data for the postcode "AR51 1AA"
    Then the top 5 restaurants should be sorted by shortest delivery time

  @api
  Scenario Outline: Validate No restaurants found for an invalid postcode
    Given I fetch restaurant data for the postcode "<postcode>"
    Then the response should indicate that no restaurants are available

    Examples:
      | postcode |
      | XY12 123   |
      | ABCD 456  |
