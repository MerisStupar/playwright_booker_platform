import { expect, test } from "../baseFixture/baseFixture";

// import LoginPage from "../pages/loginPage";
// import RoomsPage from "../pages/roomsPage";

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test.only('Test login admin function', async ({ page, loginPage, roomsPage }) => {

    // const login = new LoginPage(page);
    // const rooms = new RoomsPage(page);

    await loginPage.loginAdmin("admin", "password");

    await roomsPage.enterRoomID("707");

    await roomsPage.selectRoomType("Family");
    await roomsPage.selectRoomAccessible("true");
    await roomsPage.enterRoomPrice("50");

    await roomsPage.selectWiFi();
    await roomsPage.selectTV();
});

test.skip('Adding full specified room', async ({ page, loginPage, roomsPage }) => {

    // const login = new LoginPage(page);


    await loginPage.loginAdmin("admin", "password");

    const roomID = await page.locator(`#roomName`);
    const roomType = await page.locator(`#type`);
    const roomAccessible = await page.locator(`#accessible`);
    const roomPrice = await page.locator(`#roomPrice`);
    const roomSafeCB = await page.locator(`#safeCheckbox`);
    const createButton = await page.locator(`#createRoom`);

    const id = "400"

    await roomID.type(id);

    await roomType.click();
    await roomType.selectOption({
        value: "Family"
    });

    await roomAccessible.click();
    await roomAccessible.selectOption({
        value: "true"
    });

    await roomPrice.type("33.33e");

    await roomSafeCB.check();
    expect(roomSafeCB).toBeChecked();

    await page.waitForTimeout(3000);

    await createButton.click();

    const resultRoomID = await page.locator(`#roomName${id}`);

    expect(resultRoomID).toHaveText("400");




});




