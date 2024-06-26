import { BeforeAll, AfterAll, Before, After, AfterStep, Status, BeforeStep } from "@cucumber/cucumber";
import { Browser, BrowserContext, chromium, Page } from "@playwright/test";
import { fixture } from "./pageFixture";

let browser: Browser;
let context: BrowserContext;
let page: Page;
let isUIFeature = false;

BeforeAll(async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    page = await context.newPage();
    fixture.page = page;
    await fixture.page.setViewportSize({ width: 1920, height: 1080 });
});

Before(async function ({ pickle }) {
    const featureName = pickle.uri.replace(/^.*[\\\/]/, '').replace('.feature', '');
    if (featureName.includes('UI') || pickle.tags.some(tag => tag.name === 'UI')) {
        isUIFeature = true;
    } else {
        isUIFeature = false;
    }
});


AfterStep(async function ({ pickle, result }) {
    if (isUIFeature && !page.isClosed()) {
        try {
            const img = await fixture.page.screenshot({ path: `.test-results/screenshots/${pickle.name}.png` });
            await this.attach(img, "image/png");
        } catch (error) {
            console.error("Error taking screenshot after step:", error);
        }
    }
});

After(async function ({ pickle, result }) {
    if (isUIFeature && result?.status === Status.FAILED && !page.isClosed()) {
        try {
            const img = await fixture.page.screenshot({ path: `.test-results/screenshots/${pickle.name}.png` });
            await this.attach(img, "image/png");
        } catch (error) {
            console.error("Error taking screenshot after failure:", error);
        }
    }
});

AfterAll(async function () {
    try {
        if (browser) {
            await browser.close();
        }
    } catch (error) {
        console.error("Error closing browser in AfterAll hook:", error);
    }
});
