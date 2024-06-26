import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Page, Browser} from "playwright";
import{expect} from '@playwright/test'
import { fixture } from "../../helper/pageFixture";
import safeActions from "../utilites/safeActions";
import LoginPage from "../pages/loginPage";

let loginMethodPage: LoginPage;

setDefaultTimeout(60 * 1000 * 4)
let browser: Browser;
let page: Page;
let actions: safeActions;

Given('I Search for restaurant near my area {string}', async function (postcode) {
  loginMethodPage = new LoginPage(fixture.page);
  await loginMethodPage.navigateToLoginPage();
  await loginMethodPage.verifyLoginPageHeaderDisplayed();
  await fixture.page.fill('//input[@name="postcode"]',postcode);
  await fixture.page.click('(//button[@data-test-id="full-address-suggestions-item"])[1]');
  await fixture.page.dblclick('//button[@aria-label="Search"]');
});


