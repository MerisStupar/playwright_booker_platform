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

//? Slanje poruke i provjera poruke od strane admina
//! Sending message to the Admin from frontpage - then validate on admin panel
test.only('Sending message to the admin - validate from admin', async ({ clientPage }) => {
    
    const { page } = await launchBrowser();
    const loginPage = new LoginPage(page);
    
    await clientPage.sendMessageToAdmin();
    await clientPage.clikcSubmitButton();
    await clientPage.validateMessageToAdmin();

    await loginPage.loginAdmin(process.env.USERNAME_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);
    
    await loginPage.openMessagePage();
    await loginPage.openUnreadMessage();
    await loginPage.validateNotificationPopUp();
    
});


test.describe('Validate all alert message - send message', ()=>{
    
    test('Pass empty mesasge to the admin - TC 1', async ({ clientPage }) => {
        
        const expectedMessages = require('../data-test/alertMessageClient.json').messages_empty;
        await clientPage.sendMessagesToAdmin(``, ``, ``, ``, ``);
        await clientPage.validateAlertMessage(clientPage.page, expectedMessages);

    });

    test('Pass only name to message - TC 2', async ({ clientPage }) => {
        
        const expectedMessages = require('../data-test/alertMessageClient.json').messages_enteredName;
        await clientPage.sendMessagesToAdmin(`Meris`, ``, ``, ``, ``);
        await clientPage.validateAlertMessage(clientPage.page, expectedMessages);

    });

    test('Pass only name and email to message - TC 3', async ({ clientPage }) => {
        
        const expectedMessages = require('../data-test/alertMessageClient.json').messages_enteredEmail;
        await clientPage.sendMessagesToAdmin(`Meris`, `meris@1secmail.com`, ``, ``, ``);
        await clientPage.validateAlertMessage(clientPage.page, expectedMessages);

    });

    test('Pass name, email and phone  to message - TC 4', async ({ clientPage }) => {
        
        const expectedMessages = require('../data-test/alertMessageClient.json').messages_enteredPhone;
        await clientPage.sendMessagesToAdmin(`Meris`, `meris@1secmail.com`, `1234567891234`, ``, ``);
        await clientPage.validateAlertMessage(clientPage.page, expectedMessages);

    });

    test('Pass name, email, phone and subject  to message - TC 5', async ({ clientPage }) => {
        
        const expectedMessages = require('../data-test/alertMessageClient.json').messages_enteredSubject;
        await clientPage.sendMessagesToAdmin(`Meris`, `meris@1secmail.com`, `1234567891234`, `Test Subject`, ``);
        await clientPage.validateAlertMessage(clientPage.page, expectedMessages);

    });

})