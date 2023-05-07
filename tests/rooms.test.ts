import { expect, test } from "../baseFixture/baseFixture";
import * as data from '../data-test/roomData.json';

// import LoginPage from "../pages/loginPage";
// import RoomsPage from "../pages/roomsPage";

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test('Creating room - without POM ', async ({loginPage, roomsPage }) => {


    await loginPage.loginAdmin(process.env.USERNAM_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);

    await roomsPage.enterRoomID(data.roomID);
    await roomsPage.selectRoomType(data.roomType);
    await roomsPage.selectRoomAccessible(data.roomAccessible);
    await roomsPage.enterRoomPrice(data.roomPrice);
    await roomsPage.selectWiFi();
    await roomsPage.selectTV();
});


test.only('Adding full specified room - with POM', async ({loginPage, roomsPage, page }) => {

   /*  const expectedDetails = "WiFiTVRadioRefreshmentsSafeViews"; */

    await loginPage.loginAdmin(process.env.USERNAM_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);

    await roomsPage.addingFullRoom(data.roomID, data.roomType, data.roomAccessible, data.roomPrice);
    await page.waitForTimeout(2000);
    await roomsPage.expectedDetails();
    
   /*  const details = await page.locator("(//div[@class='col-sm-5'])").last();
    const textContent = await details.textContent();
    expect(textContent).toContain(expectedDetails) */
});







