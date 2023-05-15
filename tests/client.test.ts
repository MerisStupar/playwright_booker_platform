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
    
    // await clientPage.sendEmptyMessageToAdmin(``, ``, ``, ``, ``);
    // await clientPage.clikcSubmitButton();
    // await page.waitForTimeout(4000);

    // const alertMessage_Empty = page.locator(`div.alert.alert-danger`).textContent();

    // console.log(await alertMessage_Empty);
    await clientPage.sendEmptyMessageToAdmin(``, ``, ``, ``, ``);
    await page.waitForTimeout(3000);
    await clientPage.clikcSubmitButton();
    await page.waitForTimeout(500);
  
    const expectedMessages = require('../data-test/alertMessageClient.json').messages;

// Rest of the test code...

    // const expectedMessages = [
    //   'Message must be between 20 and 2000 characters.',
    //   'Message may not be blank',
    //   'Subject may not be blank',
    //   'Subject must be between 5 and 100 characters.',
    //   'Email may not be blank',
    //   'Phone may not be blank',
    //   'Phone must be between 11 and 21 characters.'
    // ];
  
    const alertElement = await page.waitForSelector('div.alert.alert-danger');
    const alertText = await alertElement.innerText();
  
    for (const expectedMessage of expectedMessages) {
      expect(alertText).toContain(expectedMessage);
    }


    
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
