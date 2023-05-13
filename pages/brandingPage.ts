import { Page, expect } from "@playwright/test";
import * as data from "../data-test/brandingData.json";

export default class BrandingPage{

    constructor (public page:Page){}

    //B&B details locators
    nameField = this.page.locator(`#name`);
    logoField = this.page.locator(`#logoUrl`);
    descriptionField = this.page.locator(`textarea#description`);

  
    //Map details locatos
    latitudeField = this.page.locator(`#latitude`);
    longitudeField = this.page.locator(`#longitude`);

    //Contact details locators
    contactNameField = this.page.locator(`#contactName`);
    contactAddressField = this.page.locator(`#contactAddress`);
    contactPhoneField = this.page.locator(`#contactPhone`);
    contactEmailField = this.page.locator(`#contactEmail`);
    submitButton = this.page.locator(`#updateBranding`);


    modalPopup = this.page.locator(`div[role='dialog']`);
    modalText = this.page.locator(`div.col-12>p `);
    modalButton = this.page.locator(`.col-12 button`);


    alertMesasge = this.page.locator(`div.alert.alert-danger`)

    async enterName(name:string){
        await this.nameField.type(name);
    }

    async enterLogo(){
       return await this.logoField
    }

    async enterDescription(){
        await this.descriptionField.clear();
        await this.descriptionField.fill(data.description);
        return;
    }

    async enterLatitude(latitude:string){
        await this.latitudeField.type(latitude);
    }

    async enterLongitude(longitude:string){
        await this.longitudeField.type(longitude);
    }

    async enterContactName(contact:string){
        await this.contactNameField.type(contact);
    }

    async enterAddress(address:string){
        await this.contactAddressField.type(address);
    }

    async enterPhone(phone:string){
        await this.contactPhoneField.type(phone);
    }

    async enterEmail(email:string){
        await this.contactEmailField.type(email);
    }

    async submitBtn(){
        await this.submitButton.click();
    }


    async changeContactDetails(){
        //Validate contactname field
        await this.contactNameField.scrollIntoViewIfNeeded();
        await this.contactNameField.fill(data.contactName);
        expect(this.contactNameField).toHaveValue(data.contactName);

        await this.contactAddressField.scrollIntoViewIfNeeded();
        await this.contactAddressField.fill(data.contactAddress);
        expect(this.contactAddressField).toHaveValue(data.contactAddress);

        await this.contactPhoneField.scrollIntoViewIfNeeded();
        await this.contactPhoneField.fill(data.contactPhone);
        expect(this.contactPhoneField).toHaveValue(data.contactPhone);

        await this.contactEmailField.scrollIntoViewIfNeeded();
        await this.contactEmailField.fill(data.contactEmail);
        expect(this.contactEmailField).toHaveValue(data.contactEmail);

        await this.submitBtn();

    }



    async validatePopupModal (){
        const expectedText = "Branding updated!";
        const textContext = await this.modalText.textContent();

        await expect(this.modalPopup).toBeVisible();
        await expect(textContext).toContain(expectedText);
        await expect(this.modalButton).toBeVisible();

    }

    async validateDescriptionFrontPage(){
        const descriptionFieldValue = await this.descriptionField.inputValue();
        if (descriptionFieldValue === '') {
            console.log('The description field is empty.');
        } else {
            console.log(`The description is not empty!  Text value is: ${data.description}`);
        }
    }


    async validateAlertNameMessage() {

        const alertMessage = this.page.locator(`div.alert.alert-danger`).innerText();
        const expectedAlertMessage = 'Name should not be blank' && 'size must be between 3 and 100' || 'size must be between 3 and 100' && 'Name should not be blank';

        expect(await alertMessage).toContain(expectedAlertMessage)
        return await alertMessage;
    }

    async validateAlertLogoMessage(){
        const expectedAlertLogoMessage = 'Url should not be blank';
        const alertMessage = this.page.locator(`div.alert.alert-danger`).innerText();

        await expect(await alertMessage).toContain(expectedAlertLogoMessage);

        return await alertMessage;

    }

}


