
import { expect, Page } from "@playwright/test";
import safeActions from "../utilites/safeActions";
let waitTime = 4000;
export default class menuPage {

    private base: safeActions;
    constructor(private page: Page) {
        this.base = new safeActions(page);
    }

    private menuPageElements = {
        menuPage_Loc: "//header[contains(@class,'c-card c-card--outline c-card--outline')]",
        menuItem_LOC: "(//button[@class='c-menuItems-item'])[1]",
        addToOrderButton_Loc: "//button[@data-test-id='add-to-basket']",
        radio_Button_Item_list: "(//div[@data-js='itemSelector-section-row']//input[@type='radio']/following-sibling::label/span)[1]",
        choose_Option_AddCart: "//span[@class='c-itemSelector-section-heading-title']",
        itemPopUp: "//div[@data-test-id='item-selector-modal']//div[contains(@class,'c-megaModal-document')]",
        menuItem_Cart: "//div[@data-test-id='basket-item']",
        checkOutButton_Loc: "//a[@data-test-id='checkout-button']",
        checkout_Component_Loc: "//div[@data-js-test='checkout-component']",
        increaseQuanity_Loc: "button[data-test-id='increase-quantity']",
    }

    async verifymenuPageDisplayed() {
        await this.base.wait(waitTime);
        await this.base.waitForPageLoad();
        await this.base.wait(waitTime);
        const status = await this.base.isElementPresent(this.menuPageElements.menuPage_Loc);
        if (!status) {
            const message = "menu page is not displayed"
            throw new Error(message);
        }
    }

    async verifyItemPopUp() {
        await this.base.wait(waitTime);
        await this.base.waitForPageLoad();
        const status = await this.base.isElementPresent(this.menuPageElements.itemPopUp);
        if (!status) {
            const message = "Item PopUp is not displayed"
            throw new Error(message);
        }
    }

    async clickOnmenuLink() {
        await this.base.click(this.menuPageElements.menuItem_LOC);
    }

    async clickOnCheckOutButton() {
        await this.base.click(this.menuPageElements.checkOutButton_Loc);
    }

    async increaseItemQuantity() {
        await this.base.wait(waitTime);
        const increaseButton = await this.page.locator(this.menuPageElements.increaseQuanity_Loc);
        if (increaseButton) {
            try {
                await increaseButton.click();
                console.log("Successfully clicked the increase quantity button.");
            } catch (error) {
                console.error(`Error clicking the increase quantity button: ${error}`);
            }
        } else {
            console.log("Increase quantity button not found.");
        }
    }
    
    async clickOnAddToOrder() {
        const status = await this.base.isElementPresent(this.menuPageElements.choose_Option_AddCart);
        console.log(status + "-------------------")
        if (status) {
            await this.base.click(this.menuPageElements.radio_Button_Item_list);
            await this.base.click(this.menuPageElements.addToOrderButton_Loc);
        }
        else {
            await this.base.click(this.menuPageElements.addToOrderButton_Loc);
            await this.base.click(this.menuPageElements.addToOrderButton_Loc);
        }
    }

    async verifyItemUnderCart() {
        await this.base.wait(waitTime);
        await this.base.waitForPageLoad();
        const status = await this.base.isElementPresent(this.menuPageElements.menuItem_Cart);
        if (!status) {
            const message = "Item under cart is not displayed"
            throw new Error(message);
        }
    }

    async verifyCheckoutPage() {
        await this.base.wait(waitTime);
        await this.base.waitForPageLoad();
        await this.base.wait(waitTime);
        const status = await this.base.isElementPresent(this.menuPageElements.checkout_Component_Loc);
        if (!status) {
            const message = "Checkout component page is not displayed"
            throw new Error(message);
        }
    }


}