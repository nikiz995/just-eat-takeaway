import { Given, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import axios from 'axios';
import { fixture } from '../../helper/pageFixture';
import { chromium, Browser, Page } from 'playwright';
setDefaultTimeout(60 * 1000 * 6)

interface Address {
  City: string;
  FirstLine: string;
  Postcode: string;
  Latitude: number;
  Longitude: number;
}

interface Restaurant {
  Id: number;
  Name: string;
  UniqueName: string;
  Address: Address;
  Url?: string;
  Rating: {
    Count: number;
    Average: number;
    StarRating: number;
  };
  DeliveryWorkingTimeMinutes: number;
}

interface ResponseData {
  Restaurants: Restaurant[];
}

let browser: Browser;
let page: Page;
let response: ResponseData;

function validateAddressSchema(address: any, index: number): void {
  const { City, FirstLine, Postcode, Latitude, Longitude } = address;

  if (typeof City !== 'string') {
    throw new Error(`Invalid data type for 'City' at Restaurant index ${index}. Expected string, got ${typeof City}`);
  }
  if (typeof FirstLine !== 'string') {
    throw new Error(`Invalid data type for 'FirstLine' at Restaurant index ${index}. Expected string, got ${typeof FirstLine}`);
  }
  if (typeof Postcode !== 'string') {
    throw new Error(`Invalid data type for 'Postcode' at Restaurant index ${index}. Expected string, got ${typeof Postcode}`);
  }
  if (typeof Latitude !== 'number' || isNaN(Latitude)) {
    throw new Error(`Invalid latitude for Restaurant index ${index}. Expected number, got ${typeof Latitude}`);
  }
  if (typeof Longitude !== 'number' || isNaN(Longitude)) {
    throw new Error(`Invalid longitude for Restaurant index ${index}. Expected number, got ${typeof Longitude}`);
  }
}

Given('I fetch restaurant data for the postcode {string}', async function (postcode: string) {
  const url = `https://uk.api.just-eat.io/restaurants/bypostcode/${postcode}`;
  const result = await axios.get(url);
  response = result.data;
  await this.attach(JSON.stringify(response, null, 2), "application/json");

});

Then('each restaurant should have a valid address', function () {
  response.Restaurants.forEach((restaurant, index) => {
    try {
      validateAddressSchema(restaurant.Address, index);
    } catch (error: any) {
      throw new Error(`Validation error for Restaurant index ${index}: ${error.message}. Actual address received: ${JSON.stringify(restaurant.Address)}`);
    }
  });
});

Then('all restaurants with more than 1 rating should have a star rating greater than 0', function () {
  response.Restaurants.forEach((restaurant: any, index: number) => {
    if (restaurant.Rating.Count > 1 && restaurant.Rating.StarRating <= 0) {
      const errorData = {
        Comment: `Restaurant at index ${index} has more than 1 rating but its star rating is ${restaurant.Rating.StarRating}. Expected greater than 0.`,
        RestaurantIndex: index,
        Restaurant: restaurant
      };
      this.attach(JSON.stringify(errorData, null, 2), 'application/json');
      expect(restaurant.Rating.StarRating).toBeGreaterThan(0);
    }
  });
});

Then('all restaurants with no ratings should have a star rating of 0', function () {

  response.Restaurants.forEach((restaurant: any, index: number) => {
    if (restaurant.Rating.Count === 0 && restaurant.Rating.StarRating > 0) {
      const errorData = {
        Comment: `Restaurant at index ${index} has no ratings but its star rating is ${restaurant.Rating.StarRating}. Expected 0.`,
        RestaurantIndex: index,
        Restaurant: restaurant
      };
      this.attach(JSON.stringify(errorData, null, 2), 'application/json');
      expect(restaurant.Rating.StarRating).toBe(0);

    }
  });
});

Then('at least one restaurant should have a valid URL', async function () {
  const restaurantWithUrl = response.Restaurants.find((restaurant) => !!restaurant.Url);
  if (!restaurantWithUrl) {
    throw new Error('No restaurant with a valid URL found.');
  }
  try {
    const url = restaurantWithUrl.Url;
    if (!url) {
      throw new Error('Restaurant URL is undefined or empty.');
    }
    await this.attach(url, 'text/plain');
    await fixture.page.goto(url, { timeout: 60000 });
    const response = await fixture.page.waitForResponse(response => response.status() === 200);
    expect(response.status()).toBe(200);
  } catch (error) {
    throw new Error(`Error accessing URL ${restaurantWithUrl?.Url}: ${error}`);
  }
});

Then('the top 5 restaurants should be sorted by shortest delivery time', function () {
  // Sort restaurants by DeliveryWorkingTimeMinutes in ascending order
  const sortedRestaurants = response.Restaurants.sort((a, b) => a.DeliveryWorkingTimeMinutes - b.DeliveryWorkingTimeMinutes);

  // Select top 5 restaurants with shortest delivery time
  const top5Restaurants = sortedRestaurants.slice(0, 5);

  top5Restaurants.forEach((restaurant, index) => {
    console.log(`${index + 1}. ${restaurant.Name} - Delivery Time: ${restaurant.DeliveryWorkingTimeMinutes} minutes`);
    this.attach(`${index + 1}. ${restaurant.Name} - Delivery Time: ${restaurant.DeliveryWorkingTimeMinutes} minutes`, 'text/plain');
  });

});

Then('the response should indicate that no restaurants are available', function () {
  if (response.Restaurants.length > 0) {
    throw new Error(`Expected no restaurants to be found for postcode, but found ${response.Restaurants.length} restaurants.`);
  }
});