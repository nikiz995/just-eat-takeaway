import {expect,Page } from "@playwright/test";
import safeActions from "../utilites/safeActions";
let waitTime:4000;
export default class homePage{

    private base: safeActions;
    constructor(private page: Page){
        this.base = new safeActions(page);
    }

    private homePageElements ={
        mainPage:"//div[@class='isVueCuisines isVuePredict']",
        allCuisineSlideBar_Loc:"//div[@data-test-id='all-cuisines-sidebar']",
        changeLocation_Loc:"//div[@class='c-locationHeader u-showAboveMid']",
        cuisineCarousel_Loc:"//div[@data-test-id='cuisine-carousel']",
        filterSection:"//p[contains(text(),'Filters')]/parent::div[@class='c-contentTitle u-showAboveMid']",
        filterButton:"//span[contains(text(),'Bristol Loves')]/parent::a",
        productLink:"(//h3[@data-test-id='restaurant_name']/../parent::a[@data-test-id='f-restaurant-card--restaurant-card-component'])[1]",
        searchField:"//input[@id='dish-search']",
        searchButton_Loc:"//button[@type='submit']",
        error_msg:"//div[@data-test-id='no-results']/h2",
    }
     
    async clickOnFilter(){
        await this.base.wait(waitTime)
        await this.base.waitForPageLoad();
        await this.base.click(this.homePageElements.filterButton);
    }

    async clickOnRestaurantLink(){
        await this.base.click(this.homePageElements.productLink);
    }

    async verifyHomePageDisplayed(){
        await this.base.wait(waitTime);
        await this.base.waitForPageLoad();
        const status = await this.base.isElementPresent(this.homePageElements.mainPage);
        if(!status){
            const message = "Main Page is not displayed"
            throw new Error(message);
        }
    }

    async verifyCuisineSlideBar(){
        this.base.wait(waitTime);
        const status = await this.base.isElementPresent(this.homePageElements.allCuisineSlideBar_Loc);
        if(!status){
            const message = "All Cuisine Slide Bar is not displayed in Main page"
            throw new Error(message);
        }
    }

    async verifyChangeLocationBox(){
        this.base.wait(waitTime);
        const status = await this.base.isElementPresent(this.homePageElements.changeLocation_Loc);
        if(!status){
            const message = "Change location box is not displayed in Main page"
            throw new Error(message);
        }
    }

    async verifyCuisineCarouselItems(){
        const status = await this.base.isElementPresent(this.homePageElements.cuisineCarousel_Loc);
        if(!status){
            const message = "Cuisine Carousel items is not displayed in Main page"
            throw new Error(message);
        }
    }

    async verifyFilterSection(){
        const status = await this.base.isElementPresent(this.homePageElements.filterSection);
        if(!status){
            const message = "Filter Section is not displayed in Main page"
            throw new Error(message);
        }
    }

    async enterTextUnderSearchField(restaurantName: string){
        await this.page.fill(this.homePageElements.searchField,restaurantName);
        await this.page.click(this.homePageElements.searchButton_Loc);
    }

    async verifyMessageDisplayed(meassage: string){
        let text: string
        text = await this.base.getText(this.homePageElements.error_msg);
        expect(text).toContain(meassage);
    }


}