import { Page, expect } from "@playwright/test";
import * as data from "../data-test/roomData.json";
import * as clientData from "../data-test/clientData.json";

export default class ClientPage {
  constructor(public page: Page) {
    this.page = page;
  }


  //Getting in touch selectors:
   name = this.page.locator(`#name`);
   email = this.page.locator(`#email`);
   phone = this.page.locator(`#phone`);
   subject = this.page.locator(`#subject`);
   message = this.page.locator(`#description`);
   submitContact = this.page.locator(`#submitContact`);


  //Rooms selectors
  private titleRoom = this.page.locator(`div.col-sm-7 > h3`).last();
  private bookButon = this.page.locator(`div.col-sm-7 > button`).last();

  //Selector when user click the book button
  private bookRoomFirstName = this.page.locator(`input[name='firstname']`);
  private bookRoomLastName = this.page.locator(`input[name='lastname']`);
  private bookRoomEmail = this.page.locator(`input[name='email']`);
  private bookRookPhone = this.page.locator(`input[name='phone']`);




  private bookButton = this.page.locator(`//button[text()='Book']`);
  private cancleButton = this.page.locator(`//button[text()='Cancel']`);

  //General selectors
  brandingDescription = this.page.locator(`.col-sm-10 > p`);

  contactName = this.page.locator(`.col-sm-5 > p:nth-of-type(1)`);




  async getName(name:string) {
    await this.name.type(name);
  }

  async getEmail(email:string){
    await this.email.type(email);
  }
  async getPhone(phone:string){
    await this.phone.type(phone);
  }
  async getSubject(subject:string){
    await this.subject.type(subject);
  }
  async getMessage(message:string){
    await this.message.type(message);
  }
  async clikcSubmitButton(){
    await this.submitContact.click();
  }

  async sendMessageToAdmin(){
    await this.getName(clientData.name);
    await this.getEmail(clientData.email);
    await this.getPhone(clientData.phone);
    await this.getSubject(clientData.subject);
    await this.getMessage(clientData.message);
  }

    async sendMessagesToAdmin(name:string , email:string, phone:string, subject:string, message:string){
    await this.getName(name);
    await this.getEmail(email);
    await this.getPhone(phone);
    await this.getSubject(subject);
    await this.getMessage(message);
    await this.clikcSubmitButton();
  }

  async validateAlertMessage(page, expectedMessages){
    
    const alertElement = await this.page.waitForSelector('div.alert.alert-danger');
    const alertText = await alertElement.innerText();

    // expect(alertText).toContain(expectedMessage);
    for (const expectedMessage of expectedMessages) {
      expect(alertText).toContain(expectedMessage);
    }
  }
  

  async performTest(expectedMessages, messageParams) {
    await this.sendMessagesToAdmin(messageParams[0], messageParams[1], messageParams[2], messageParams[3], messageParams[4]);
    await this.clikcSubmitButton();
    await this.validateAlertMessage(this.page, expectedMessages);
  }


  

  async validateMessageToAdmin(){
    const expectedText = `Thanks for getting in touch ${clientData.name}`;
    const expectedParagraph = `${clientData.subject}`;
    const responseMessage = this.page.locator(`div.col-sm-5 h2`);
    const responseParagraph = this.page.locator(`//p[text()='${clientData.subject}']`)
    
    await responseMessage.waitFor({timeout: 1000});
    await responseMessage.isVisible();

    await expect(await responseMessage.textContent()).toContain(expectedText);
    await expect(await responseParagraph.textContent()).toContain(expectedParagraph);

    console.log(`Current text: ${await responseMessage.textContent()} \n ${await responseParagraph.textContent()}`);
  }





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



  async validateRoomVisibility() {

    const nameOfRoom = await this.page.locator(`//h3[text()='${data.roomType}']`).last();
    const textContextTile = await nameOfRoom.textContent();

    const imageOfRoom = await this.page.locator(`.col-sm-3>img`).last();
    const imageElement = await imageOfRoom.elementHandle();

    if (imageElement !== null) {
      const expectedURL = 'https://www.mwtestconsultancy.co.uk/img/room1.jpg';
      const imageURL = await (await imageElement.getProperty('src')).jsonValue();
      const naturalHeight = await (await imageElement.getProperty('naturalHeight')).jsonValue();
      const naturalWidth = await (await imageElement.getProperty('naturalWidth')).jsonValue();

      expect(naturalHeight).toBeGreaterThan(0);
      expect(naturalHeight).toBeGreaterThan(0);
      expect(imageURL).toEqual(expectedURL);

      console.log(`Current size of image: ${naturalHeight}, ${naturalWidth}`);

    } else {
      throw new Error('Cannot find image of the room.')
    }

    expect(textContextTile).toContain(data.roomType);


    console.log(`Current text from front page of title room is: ${textContextTile}`);

    const liLocators = await this.page.locator('.col-sm-7 > ul').last().all();
    const expectedLocators = 'WiFiTVRadioRefreshmentsSafeViews'
    for (const liLocator of liLocators) {
      const liText = await liLocator.textContent();
      console.log(`Current list of room details are: ${liText}`);
      expect(liText).toEqual(expectedLocators)
    }

  }

}

module.exports = ClientPage;