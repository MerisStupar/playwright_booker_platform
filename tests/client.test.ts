import { chromium } from "@playwright/test";
import { expect, test } from "../baseFixture/baseFixture";
import * as clientData from "../data-test/clientData.json";
import LoginPage from "../pages/loginPage";
import { assert, log } from "console";

const launchBrowser = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  };

test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
});



test('Sending a message to the admin', async ({ clientPage }) => {

    const { page } = await launchBrowser();
    const loginPage = new LoginPage(page);

    await clientPage.sendMessageToAdmin();
    await clientPage.clikcSubmitButton();
    await clientPage.validateMessageToAdmin();

    await loginPage.loginAdmin(process.env.USERNAM_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);


    const expectedUrl = 'https://automationintesting.online/#/admin/messages'

    await loginPage.page.locator(`.nav-link > i.fa-inbox`).isVisible();
    await loginPage.page.locator(`.nav-link > i.fa-inbox`).click();

    expect(await loginPage.page.url()).toBe(expectedUrl);
    console.log(await loginPage.page.url());

    const rowMessage = page.locator(`.row.detail.read-false:last-child`).last();
    const toText = await rowMessage.textContent();

    expect(toText).toContain(clientData.name && clientData.subject);

    await rowMessage.click();
    
    console.log(toText);

    // await loginPage.validateNotificationPopUp();

    const messagePopup = page.locator(`div.ReactModal__Content.ReactModal__Content--after-open.message-modal`);
    const fromValue = page.locator(`div.col-10`);


    await messagePopup.isVisible();
    await page.waitForTimeout(10000);
    expect(await fromValue.textContent()).toContain(`From: ${clientData.name}`);

    


    

   

});
