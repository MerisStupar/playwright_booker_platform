import { chromium } from "@playwright/test";
import { expect, test } from "../baseFixture/baseFixture";
import LoginPage from "../pages/loginPage";


const launchBrowser = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  };

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
});


test.only('Pass empty mesasge to the admin', async ({ page, clientPage }) => {
    
    await clientPage.sendEmptyMessageToAdmin();
    await clientPage.clikcSubmitButton();
    await page.waitForTimeout(4000);

    const alertMessage_Empty = page.locator(`div.alert.alert-danger`).textContent();

    console.log(await alertMessage_Empty);

});



//? Slanje poruke i provjera poruke od strane admina
//! Sending message to the Admin from frontpage - then validate on admin panel
test('Sending message to the admin - validate from admin', async ({ clientPage }) => {

    const { page } = await launchBrowser();
    const loginPage = new LoginPage(page);

    await clientPage.sendMessageToAdmin();
    await clientPage.clikcSubmitButton();
    await clientPage.validateMessageToAdmin();

    await loginPage.loginAdmin(process.env.USERNAM_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);

    await loginPage.openMessagePage();
    await loginPage.openUnreadMessage();
    await loginPage.validateNotificationPopUp();

});
