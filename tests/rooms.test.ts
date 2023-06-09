import { chromium } from "@playwright/test";
import { expect, test } from "../baseFixture/baseFixture";
import * as data from '../data-test/roomData.json';
import ClientPage from "../pages/clientPage";


const launchBrowser = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  };



test.beforeEach(async ({ page, baseURL, loginPage }) => {
    await page.goto(`${baseURL}/#/admin`);
    await loginPage.loginAdmin(process.env.USERNAME_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);
});

test('Creating room with empty data', async ({ roomsPage }) => {

    await roomsPage.selectCreateButton();
    await roomsPage.validateAlertMessageEmptyData("Room name must be setmust be greater than or equal to 1");
    
});

test('Creating room with only ID', async ({ roomsPage }) => {

    await roomsPage.enterRoomID(data.roomID);
    await roomsPage.selectCreateButton();
    await roomsPage.validateAlertMessageEmptyData("must be greater than or equal to 1");
});

test('Creating room with only price', async ({ roomsPage }) => {

    await roomsPage.enterRoomPrice(data.roomPrice);
    await roomsPage.selectCreateButton();
    await roomsPage.validateAlertMessageEmptyData("Room name must be set");
});


test('Creating room - without POM ', async ({roomsPage }) => {

    await roomsPage.enterRoomID(data.roomID);
    await roomsPage.selectRoomType(data.roomType);
    await roomsPage.selectRoomAccessible(data.roomAccessible);
    await roomsPage.enterRoomPrice(data.roomPrice);
    await roomsPage.selectWiFi();
    await roomsPage.selectTV();

});


test('Adding full specified room - with POM', async ({roomsPage }) => {

    await roomsPage.addingFullRoom(data.roomID, data.roomType, data.roomAccessible, data.roomPrice);
    await roomsPage.expectedDetails_CreatingRoom();

});


//? Kreiranje nove sobe od strane admina i provjera da se soba pojavljuje na user strani sa svim relevantnim podacima
//! Creating room from admin then validete on frontpage

test.only('Adding full specified room - and validate on the user side if room was visible', async ({ roomsPage, baseURL }) => {

    const { page } = await launchBrowser();
    const clientPage = new ClientPage(page);

    await roomsPage.addingFullRoom(data.roomID, data.roomType, data.roomAccessible, data.roomPrice);
    await roomsPage.expectedDetails_CreatingRoom();

    await clientPage.page.goto(`${baseURL}`);
    await clientPage.validateRoomVisibility();    

});










