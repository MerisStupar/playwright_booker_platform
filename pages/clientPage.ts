import { Page, expect } from "@playwright/test";
import { chromium } from "@playwright/test";
import * as data from "../data-test/roomData.json";

export default class ClientPage {
  constructor(public page: Page) {
    this.page = page;
  }

  //Rooms selectors
  private titleRoom = this.page.locator(`div.col-sm-7 > h3`).last();
  private bookButon = this.page.locator(`div.col-sm-7 > button`).last();

  //Selector when user click the book button
  private firstName = this.page.locator(`input[name='firstname']`);
  private lastName = this.page.locator(`input[name='lastname']`);
  private email = this.page.locator(`input[name='email']`);
  private phone = this.page.locator(`input[name='phone']`);

  private bookButton = this.page.locator(`//button[text()='Book']`);
  private cancleButton = this.page.locator(`//button[text()='Cancel']`);

  //General selectors
  brandingDescription = this.page.locator(`.col-sm-10 > p`);

  contactName = this.page.locator(`.col-sm-5 > p:nth-of-type(1)`);

  async validateTitleRoom() {
    const textContext = await this.titleRoom.textContent();
    expect(this.titleRoom).toBeVisible();
    expect(textContext).toContain(data.roomType);
  }


  async getContactName() {
    return await this.page
      .locator(`.col-sm-5 > p:nth-of-type(1)`)
      .textContent();
  }

  async getContactAddress() {
    return await this.page
      .locator(`.col-sm-5 > p:nth-of-type(2)`)
      .textContent();
  }

  async getContactPhone() {
    return await this.page
      .locator(`.col-sm-5 > p:nth-of-type(3)`)
      .textContent();
  }

  async getContactEmail() {
    return await this.page
      .locator(`.col-sm-5 > p:nth-of-type(4)`)
      .textContent();
  }

  async getLogoPicture(){
    return await this.page
    .locator(`img.hotel-logoUrl`);
  }

  async logoHandle(){
    return   await this.page.locator(`img.hotel-logoUrl`);
  }


  
  async validateLogo(){
    const brokenURL = 'https://www.mwtestconsultancy.co.uk/img/rbp-logo.png';
    const imgLogoLocator = await this.page.locator(`img.hotel-logoUrl`);
    const imgLogoElement = await imgLogoLocator.elementHandle();

    if (imgLogoElement !== null) {
        const srcHandle = await (await imgLogoElement.getProperty('src')).jsonValue();
        const heightHandle = await (await imgLogoElement.getProperty('naturalHeight')).jsonValue();
        const widthHandle = await (await imgLogoElement.getProperty('naturalWidth')).jsonValue();
        expect(srcHandle).toEqual(brokenURL);
        expect(imgLogoLocator).toBeVisible();
        expect(heightHandle).toEqual(0); // replace with the expected height value
        expect(widthHandle).toEqual(0); // replace with the expected width value
      } else {
        throw new Error('Could not find logo element');
      }

  }


}

module.exports = ClientPage;