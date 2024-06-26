import {Page, expect} from "@playwright/test";

export default class safeActions{
    constructor(private page: Page){}



    async goto(url: string){
        await this.page.goto(url,{
            waitUntil:"domcontentloaded"
        });
        await this.page.waitForURL(url);
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState();
    }

    async waitAndClick(locator: string){
        const element = this.page.locator(locator);
        await element.waitFor({
            state: "visible"
        })
        await element.click();
    }

    async assertTitle(title: string){
        await expect(this.page).toHaveTitle(title);
    }

    async wait(milliseconds:number) {
        //this.page.waitForTimeout(milliseconds);
        return new Promise(resolve => setTimeout(resolve,milliseconds));
    }

    async isElementPresent(locator: string): Promise<boolean>{
        const element = this.page.locator(locator);
        return await element.isVisible();
    }
    async click(locator: string){
        this.page.click(locator);
    }
    async dblClick(locator: string){
        this.page.dblclick(locator);
    }

    async getText(locator: string): Promise<string>{
        const element = this.page.locator(locator);
        return await element.textContent() || '';
    }
    
   


}