import { expect, test } from "@playwright/test";

import LoginPage from "../pages/loginPage";
import RoomsPage from "../pages/roomsPage";

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test.only('Test login admin function', async ({ page }) => {

    const login = new LoginPage(page);
    const rooms = new RoomsPage(page);

    await login.loginAdmin("admin", "password");


    // const roomID = "405"
    await rooms.enterRoomID("707");

    const type = await page.locator(`#type`);
    const roomAccessible = page.locator(`#accessible`);


    await selectingTypes("Family");
    await page.waitForTimeout(2000);

    await selectAccessible("true");
    await page.waitForTimeout(2000);

    await rooms.enterRoomPrice("333");
   
    await rooms.selectWiFi();
    await rooms.selectTV();
    await rooms.selectViews();
    await rooms.selectCreateButton();


    


    async function selectingTypes(valueName) {
        await type.click();
        await type.selectOption({
            value: valueName
        });
    }

    async function selectAccessible(option) {
        await roomAccessible.click();
        await roomAccessible.selectOption({
            value: option
        });
    }
});

test.skip('Adding full specified room', async ({ page }) => {

    const login = new LoginPage(page);


    await login.loginAdmin("admin", "password");

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




