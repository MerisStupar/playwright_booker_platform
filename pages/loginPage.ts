import { Page, expect } from "@playwright/test";
import * as clientData from "../data-test/clientData.json";

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

    async openUnreadMessage(){

    const rowMessage = this.page.locator(`.row.detail.read-false:last-child`).last();
    const toText = await rowMessage.textContent();

    expect(toText).toContain(clientData.name && clientData.subject);

    await rowMessage.click();
    console.log(toText);

    }

    async openMessagePage(){
        const expectedUrl = 'https://automationintesting.online/#/admin/messages';

        await this.page.locator(`.nav-link > i.fa-inbox`).isVisible();
        await this.page.locator(`.nav-link > i.fa-inbox`).click();

        expect(await this.page.url()).toBe(expectedUrl);
        console.log('This should be URL from messages: '+ await this.page.url());
    }


    async validateNotificationPopUp(){
        const messagePopup = this.page.locator(`div.ReactModal__Content.ReactModal__Content--after-open.message-modal`);
        const isVisible = await messagePopup.isVisible();

         //Popup message 
        const fromUserName = this.page.locator(`div.col-10`);
        const fromUserPhone = this.page.locator(`div.col-2 p`);
        const fromUserEmail = this.page.locator(`(//div[@class='col-12']//p)[1]`);
        const fromUserSubject = this.page.locator(`(//div[@class='col-12']//span)[2]`);
        const fromUserMessage = this.page.locator(`(//div[@class='col-12']//p)[3]`);

        if(isVisible){
            await console.log("Message popup is visible")
        }else{
            await console.log("Message popup is not visible");
        }

        await messagePopup.isVisible();
        await this.page.waitForTimeout(1000);
        
        expect(await fromUserName.textContent()).toContain(`From: ${clientData.name}`);
        expect(await fromUserPhone.textContent()).toContain(`Phone: ${clientData.phone}`);
        expect(await fromUserEmail.textContent()).toContain(`Email: ${clientData.email}`);
        expect(await fromUserSubject.textContent()).toContain(`${clientData.subject}`);
        expect(await fromUserMessage.textContent()).toContain(`${clientData.message}`);
    }



}