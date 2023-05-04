import { expect, test } from "@playwright/test";

import LoginPage from "../pages/loginPage";
import RoomsPage from "../pages/roomsPage";

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test('Test login admin function', async ({ page }) => {

    const login = new LoginPage(page);
    const rooms = new RoomsPage(page);

    await login.loginAdmin("admin", "password");


    await rooms.enterRoomID("308");
    
    const type = await page.locator(`#type`);

    await selectingTypes("Single");
    await page.waitForTimeout(2000);
    await selectingTypes("Twin");
    await page.waitForTimeout(2000);
    await selectingTypes("Double");
    await page.waitForTimeout(2000);
    await selectingTypes("Family");

    await page.waitForTimeout(5000);

    async function selectingTypes(valueName) {
        await type.click();
        await type.selectOption({
            value: valueName
        });
    }

});


