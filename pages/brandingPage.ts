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

    async enterName(name:string){
        await this.nameField.type(name);
    }

    async enterLogo(logo:string){
        await this.logoField.type(logo);
    }

    async enterDescription(description:string){
        await this.descriptionField.type(description);
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

    async changeDesc(){
        
        const descriptionSlector = 'textarea#description';
        await this.page.waitForSelector(descriptionSlector);

        await this.descriptionField.clear();
        return;
    }

   


}


