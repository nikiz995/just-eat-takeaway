import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser } from "playwright";
import { expect } from '@playwright/test'
import { fixture } from "../../helper/pageFixture";
import safeActions from "../utilites/safeActions";
import menuPage from "../pages/MenuPage";

let menuMethodPage: menuPage;

setDefaultTimeout(60 * 1000 * 4)
let browser: Browser;
let page: Page;
let actions: safeActions;


Given('I navigate to the Menu Details page', async function () {
  menuMethodPage = new menuPage(fixture.page);
  await menuMethodPage.verifymenuPageDisplayed();
});
When('I click on a product item', async function () {
  await menuMethodPage.clickOnmenuLink();
});
Then('I should see the Item Pop-Up after selecting the product', async function () {
  await menuMethodPage.verifyItemPopUp();
});
When('I increase the item quanity and click on Add to Order button', async function () {
  await menuMethodPage.increaseItemQuantity();
  await menuMethodPage.clickOnAddToOrder();
});
Then('I should see the menu item added to the cart', async function () {
  await menuMethodPage.verifyItemUnderCart();
});
When('I click on Go to Checkout button', async function () {
  await menuMethodPage.clickOnCheckOutButton();
});
Then('I should see Checkout page', async function () {
  await menuMethodPage.verifyCheckoutPage();
});