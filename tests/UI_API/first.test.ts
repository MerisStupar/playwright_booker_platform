import {test, expect} from "../../baseFixture/baseFixture";
import MessagePage  from "../../pages_api/MessagesPage";
import * as roomData from "../..//data-test/messageDataAPI.json";

test.beforeEach(async ({page, baseURL, loginPage}) =>{
    await page.goto(`${baseURL}/#/admin/branding`);
});


test('UI+API Test: Sending message with API + login with UI', async ({ page, loginPage}) => {


    const messagePage = new MessagePage(page);
    const body = await messagePage.sendMessage();

    expect(body.name).toBe(roomData.name);
    expect(body.email).toBe(roomData.email);
    expect(body.subject).toBe(roomData.subject);
    
    await loginPage.loginAdmin(process.env.USERNAME_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);

    await page.locator(`.nav-link > i.fa-inbox`).click();

    const rowMessage = await page.locator(`.row.detail.read-false:last-child`).last();
    const toText = await rowMessage.textContent()
    expect(toText).toContain(roomData.name && roomData.subject);

    // console.log(toText);
});
