import { Page, expect } from "@playwright/test";
import * as data from '../data-test/roomData.json';

export default class ClientPage{

    constructor(public page:Page){}


    private titleRoom = this.page.locator(`div.col-sm-7 > h3`).last();
    private bookButon = this.page.locator(`div.col-sm-7 > button`).last();

    
    //Selector when user click the book button
    private firstName = this.page.locator(`input[name='firstname']`);
    private lastName = this.page.locator(`input[name='lastname']`);
    private email = this.page.locator(`input[name='email']`);
    private phone = this.page.locator(`input[name='phone']`);

    private bookButton = this.page.locator(`//button[text()='Book']`);
    private cancleButton = this.page.locator(`//button[text()='Cancel']`);



    async validateTitleRoom(){
        const textContext = await this.titleRoom.textContent()
        expect(this.titleRoom).toBeVisible();
        expect(textContext).toContain(data.roomType);
    }
    
}