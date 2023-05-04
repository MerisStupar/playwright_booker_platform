import { Page } from "@playwright/test";


export default class LoginPage{

    
    constructor (public page: Page){}

    private usernameField = this.page.locator(`#username`);
    private passwordField = this.page.locator(`#password`);
    private loginButton = this.page.locator(`#doLogin`);


    async enterUsername(username: string){
        await this.usernameField.type(username);
    }

    async enterPassword(password: string){
        await this.passwordField.type(password);
    }

    async clickLoginButton(){
        await this.loginButton.click();
    }

    async loginAdmin(username: string, password:string){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }



}