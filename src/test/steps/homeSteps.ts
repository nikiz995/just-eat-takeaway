import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";
import { expect } from '@playwright/test'
import { fixture } from "../../helper/pageFixture";
import safeActions from "../utilites/safeActions";
import HomePage from "../pages/homePage";

let homeMethodPage: HomePage;

setDefaultTimeout(60 * 1000 * 4)
let browser: Browser;
let page: Page;
let actions: safeActions;


Given('I Navigate to Search Restaurant page', async function () {
  homeMethodPage = new HomePage(fixture.page);
  await homeMethodPage.verifyHomePageDisplayed();
});

When('I select the displayed restaurant from the result list', async function () {
  await homeMethodPage.clickOnRestaurantLink();

});

Then('I should see the Cuisine Carousel Items ,Change Location, CuisineSlide bar and FilterSection', async function () {
  await homeMethodPage.verifyCuisineCarouselItems();
  await homeMethodPage.verifyChangeLocationBox();
  await homeMethodPage.verifyCuisineSlideBar();
  await homeMethodPage.verifyFilterSection();
});

When('I Search for restaurant {string} under search field', async function (restaurantName) {
  await homeMethodPage.enterTextUnderSearchField(restaurantName)
});
Then('I should see {string} message is displayed', async function (message) {
  await homeMethodPage.verifyMessageDisplayed(message);
});