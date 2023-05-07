import { expect, test } from "../baseFixture/baseFixture";
import * as data from '../data-test/roomData.json';

// import LoginPage from "../pages/loginPage";
// import RoomsPage from "../pages/roomsPage";

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test('Creating room', async ({ page, loginPage, roomsPage }) => {


    await loginPage.loginAdmin("admin", "password");

    await roomsPage.enterRoomID("707");

    await roomsPage.selectRoomType("Family");
    await roomsPage.selectRoomAccessible("true");
    await roomsPage.enterRoomPrice("50");

    await roomsPage.selectWiFi();
    await roomsPage.selectTV();
});

test.only('Adding full specified room', async ({ page, loginPage, roomsPage }) => {

    await loginPage.loginAdmin("admin", "password");
    await roomsPage.addingFullRoom(data.roomID, data.roomType, data.roomAccessible, data.roomPrice);

});




