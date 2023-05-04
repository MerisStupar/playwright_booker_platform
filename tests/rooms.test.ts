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


    await rooms.enterRoomID("404");
    
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

test('Adding full specified room', async ({ page }) => {

    const login = new LoginPage(page);
    const rooms = new RoomsPage(page);


    await login.loginAdmin("admin", "password");
  
    await rooms.enterRoomID("505");
    await rooms.selectRoomType("Double");
  

    await page.waitForTimeout(3000);

});




