import { chromium } from "@playwright/test";
import { expect, test } from "../baseFixture/baseFixture";
import * as data from "../data-test/brandingData.json";
import ClientPage from "../pages/clientPage";


const launchBrowser = async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  };


test.beforeEach(async ({ page, baseURL, loginPage }) => {
    await page.goto(`${baseURL}/#/admin/branding`);
    await loginPage.loginAdmin(process.env.USERNAM_OF_ADMIN!, process.env.PASSWORD_OF_ADMIN!);
  
});


test('Change description in branding', async ({ brandingPage, page }) => {
    
    await brandingPage.descriptionField.click({clickCount: 3});
    await brandingPage.descriptionField.press('Backspace');
    await brandingPage.descriptionField.fill(data.description);
    expect(brandingPage.descriptionField).toHaveValue(data.description);

    await brandingPage.submitButton.click();
    await page.waitForTimeout(3000);

    await brandingPage.modalPopup.isVisible();
    await brandingPage.modalText.isVisible();
});


test('Branding updating - description updating', async ({ page, brandingPage }) => {

    await brandingPage.enterDescription();
    await brandingPage.descriptionField.fill(data.description);
    expect(brandingPage.descriptionField).toHaveValue(data.description);
    await brandingPage.submitButton.click();

    const modalPopup = await page.locator(`div[role='dialog']`);
    await expect(modalPopup).toBeVisible();

    const expectedText = "Branding updated!";
    const modalText = await page.locator(`div.col-12>p `);
    const textContext = await modalText.textContent();

    console.log(textContext);

    await expect(textContext).toContain(expectedText);

    await brandingPage.modalButton.click();


    const textDesc = await brandingPage.descriptionField.textContent();

    await expect(textDesc).toContain(data.description);

    console.log("This is new description: " + textDesc);

});


test('Change B&B description in branding - then validate on front page', async ({ brandingPage, baseURL }) => {
    //This is from function for reusing the newPage in other tests if needed
    const { page } = await launchBrowser();
    const clientPage = new ClientPage(page);

    await page.waitForTimeout(500); 
    await brandingPage.enterDescription();
    await brandingPage.validateDescriptionFrontPage();
    await brandingPage.submitBtn();
    await brandingPage.validatePopupModal();

    
    //Opening new windows - to validate data on frontpage
    await clientPage.page.goto(`${baseURL}`);
    const descriptionFrontPage = await clientPage.page.locator(`.col-sm-10 > p`);
    const textContext = await descriptionFrontPage.textContent();

    console.log(`This text was from front-page: ${textContext}`);

    await descriptionFrontPage.scrollIntoViewIfNeeded();
    expect(textContext).toContain(data.description);
}); 



test('Change Contact details - then validate on front page', async ({brandingPage, baseURL }) => {

     //This is from function for reusing the newPage in other tests if needed
    const {page: newPage} = await launchBrowser();

    await brandingPage.changeContactDetails();
    await newPage.goto(`${baseURL}`);

    const contactName = await newPage.locator(`.col-sm-5 > p:nth-of-type(1)`).textContent();
    const contactAdress = await newPage.locator(`.col-sm-5 > p:nth-of-type(2)`).textContent();
    const contactNumber = await newPage.locator(`.col-sm-5 > p:nth-of-type(3)`).textContent();
    const contactEmail = await newPage.locator(`.col-sm-5 > p:nth-of-type(4)`).textContent();


    expect(contactName).toContain(data.contactName);
    expect(contactAdress).toContain(data.contactAddress);
    expect(contactNumber).toContain(data.contactPhone);
    expect(contactEmail).toContain(data.contactEmail);


    console.log(`This is new contact name: ${contactName}`);


});


test('Change Contact Details - then validate on front page with POM', async ({ baseURL, brandingPage}) => {
   

    const { page } = await launchBrowser();
    const clientPage = new ClientPage(page);

    await brandingPage.changeContactDetails();
    await clientPage.page.goto(`${baseURL}`);

    expect(await clientPage.getContactName()).toContain(data.contactName);
    expect(await clientPage.getContactAddress()).toContain(data.contactAddress);
    expect(await clientPage.getContactPhone()).toContain(data.contactPhone);
    expect(await clientPage.getContactEmail()).toContain(data.contactEmail);


    console.log(`New contact DATA: 
    ${await clientPage.getContactName()} \n
    ${await clientPage.getContactAddress()} \n
    ${await clientPage.getContactPhone()} \n
    ${await clientPage.getContactEmail()}
    `);

  });

test("B&B Name field - passing empty", async ({ page, baseURL, brandingPage }) => {
    
    await page.goto(`${baseURL}/#/admin/branding`);
    await brandingPage.nameField.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await brandingPage.nameField.fill('');
    await brandingPage.submitBtn();
    await brandingPage.validateAlertNameMessage();

  });

test.only('Logo field - passing emtpy', async ({ page, baseURL, brandingPage }) => {

    await page.goto(`${baseURL}/#/admin/branding`);
    await brandingPage.logoField.scrollIntoViewIfNeeded();
    await brandingPage.logoField.waitFor({timeout: 1000})
    await brandingPage.logoField.clear();
    await brandingPage.submitBtn();
    await brandingPage.validateAlertLogoMessage();

});
  


test('B&B Logo field - validate on the front page - POM', async ({ baseURL, brandingPage }) => {
  
    const { page } = await launchBrowser();
    const clientPage = new ClientPage(page);

    const brokenURL = 'https://www.mwtestconsultancy.co.uk/img/rbp-logo.png';

    await page.goto(`${baseURL}/#/admin/branding`);
    await brandingPage.logoField.scrollIntoViewIfNeeded();
    await brandingPage.logoField.fill('');
    await page.waitForTimeout(3000);
    await brandingPage.logoField.fill(brokenURL);
    await brandingPage.submitBtn();
    await brandingPage.validatePopupModal();

     //Opening new windows - to validate data on frontpage
    await clientPage.page.goto(`${baseURL}`);
    await clientPage.page.waitForTimeout(3000);

    await clientPage.validateLogo();
});




