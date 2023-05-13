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
