import { expect, test } from "../baseFixture/baseFixture";
import * as data from '../data-test/roomData.json';

// import LoginPage from "../pages/loginPage";
// import RoomsPage from "../pages/roomsPage";

test.beforeEach(async ({ page, baseURL, loginPage }) => {
    await page.goto(`${baseURL}/#/admin`);
    await loginPage.loginAdmin(process.env.USERNAM_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);
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


test('Adding full specified room - with POM', async ({roomsPage, page }) => {

   /*  const expectedDetails = "WiFiTVRadioRefreshmentsSafeViews"; */
    await roomsPage.addingFullRoom(data.roomID, data.roomType, data.roomAccessible, data.roomPrice);
    await page.waitForTimeout(2000);
    await roomsPage.expectedDetails();
    
   /*  const details = await page.locator("(//div[@class='col-sm-5'])").last();
    const textContent = await details.textContent();
    expect(textContent).toContain(expectedDetails) */
});










