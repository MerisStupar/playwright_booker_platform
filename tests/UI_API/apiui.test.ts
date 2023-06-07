import {test, expect} from "../../baseFixture/baseFixture";
import MessagePage  from "../../pages_api/MessagesPage";
import RoomsPage from "../../pages_api/RoomsPage";

import * as messageData from "../../data-test/messageDataAPI.json";
import * as roomData from "../../data-test/roomDataAPI.json";


test.beforeEach(async ({page, baseURL}) =>{
    await page.goto(`${baseURL}/#/admin/branding`);
});


test('UI+API Test: Sending message with API - Then login with UI', async ({ page, loginPage }) => {


    const messagePage = new MessagePage(page);
    //Sending message with API 
    const body = await messagePage.sendMessage();

    expect(body.name).toBe(messageData.name);
    expect(body.email).toBe(messageData.email);
    expect(body.subject).toBe(messageData.subject);

    //Login with UI to validate that message is correct
    await loginPage.loginAdmin(process.env.USERNAME_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);
    await loginPage.validMessage_UIAPI();

});

test.only('UI+API Test: Create room with API - Then view on UI', async ({ page }) => {

    const roomsPage = new RoomsPage(page);
    const body = await roomsPage.createRoom()

    expect(body.type).toBe(roomData.type);
    expect(body.roomName).toBe(roomData.roomName);
    expect(body.roomPrice).toBe(roomData.roomPrice);

    await page.goto(`https://automationintesting.online/`);

    const nameOfRoom = await page.locator(`//h3[text()='${roomData.type}']`).last();
    const textContextTile = await nameOfRoom.textContent();
    const imageOfRoom = await page.locator(`.col-sm-3>img`).last();
    const imageElement = await imageOfRoom.elementHandle();


    if (imageElement !== null) {
        const expectedURL = `${roomData.image}`;
        const imageURL = await (await imageElement.getProperty('src')).jsonValue();
    
        expect(imageURL).toEqual(expectedURL);

      } else {
        throw new Error('Cannot find image of the room.')
      }
  
      expect(textContextTile).toContain(roomData.type);
  
  
      console.log(`Current text from front page of title room is: ${textContextTile}`);

});

