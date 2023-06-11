import {test, expect} from "../../baseFixture/baseFixture";
import MessagePage  from "../../pages_api/MessagesPage";
import RoomsPage from "../../pages_api/RoomsPage";
import BrandingPage from "../../pages_api/BrandingPage";

import * as messageData from "../../data-test/messageDataAPI.json";
import * as roomData from "../../data-test/roomDataAPI.json";
import * as brandingData from "../../data-test/brandingDataAPI.json"


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

test('UI+API Test: Create room with API - Then view on UI', async ({ page, clientPage }) => {

    const roomsPage = new RoomsPage(page);
    const body = await roomsPage.createRoom()

    expect(body.type).toBe(roomData.type);
    expect(body.roomName).toBe(roomData.roomName);
    expect(body.roomPrice).toBe(roomData.roomPrice);

    //Validate from the UI that room was correct
    await clientPage.validateRoomVisibility_UIAPI();

});

test.only('UI+API Test: Update branding with API - Then valdiate on Ui', async ({ page, clientPage }) => {


    const brandingPage = new BrandingPage(page);
    const body = await brandingPage.updateBranding();

    expect(body.name).toBe(brandingData.name);
    expect(body.logoUrl).toBe(brandingData.logoUrl);
    expect(body.description).toBe(brandingData.description);
    expect(body.contact.phone).toBe(brandingData.contact.phone);

    
    //Validate from the UI that brading was correct from API test
    await clientPage.validateBrandingUIAPI();

});


