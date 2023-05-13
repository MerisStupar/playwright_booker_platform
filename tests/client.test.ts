import { chromium } from "@playwright/test";
import { expect, test } from "../baseFixture/baseFixture";
import * as clientData from "../data-test/clientData.json";



test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}`);
});



test('Sending a message to the admin', async ({ page, clientPage }) => {

    await clientPage.sendMessageToAdmin();
    await clientPage.clikcSubmitButton();
    await clientPage.validateMessageToAdmin();

});
