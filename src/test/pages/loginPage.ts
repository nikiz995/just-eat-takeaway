import {expect,Page } from "@playwright/test";
import safeActions from "../utilites/safeActions";

export default class loginPage{

    private base: safeActions;
    constructor(private page: Page){
        this.base = new safeActions(page);
    }

    private loginPageElements ={
        header:"//h1[contains(text(),'Tuck into a takeaway today')]",
        postCodeInputBox:"//input[@name='postcode']",
        searchButton:"//button[@aria-label='Search']"
    }

    async navigateToLoginPage(){
        await this.base.goto("https://www.just-eat.co.uk")
    }
    async verifyLoginPageHeaderDisplayed(){
        const status = await this.base.isElementPresent(this.loginPageElements.header);
        if(!status){
            const message = "header is not displayed"
            throw new Error(message);
        }
    }


}