import { Page, expect } from "@playwright/test";


export default class LoginPage{

    
    constructor (public page: Page){}

    usernameField = this.page.locator(`#username`);
    passwordField = this.page.locator(`#password`);
    loginButton = this.page.locator(`#doLogin`);

    logoutNavbar = this.page.locator(`//a[contains(text(),'Logout')]`);
    loginHeaderText = this.page.locator(`h2[data-testid='login-header']`);


    async enterUsername(username: string){
        await this.usernameField.type(username);
    }

    async enterPassword(password: string){
        await this.passwordField.type(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async loginAdmin1(username: string, password:string){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    //!Important POGELDATI

    async loginAdmin(username: string, password:string){
        await this.page.goto(`https://automationintesting.online/#/admin`);
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }


    async validateNotificationPopUp(){
        const messagePopup = this.page.locator(`div.ReactModal__Content.ReactModal__Content--after-open.message-modal`);
        const isVisible = await messagePopup.isVisible();

        if(isVisible){
            await console.log("Message popup is visible")
        }else{
            await console.log("Message popup is not visible");
        }

    }



}