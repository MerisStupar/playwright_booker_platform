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

    // await brandingPage.modalText.textContent();
    
    // console.log(brandingPage.modalText);
});


test('Branding updating - description updating', async ({ page, brandingPage }) => {
    await page.waitForTimeout(3000);
    await brandingPage.enterDescription();
    // await page.waitForTimeout(3000);
    // await brandingPage.descriptionField.clear()
    await brandingPage.descriptionField.fill(data.description);
    await page.waitForTimeout(3000);
    expect(brandingPage.descriptionField).toHaveValue(data.description);

    await brandingPage.submitButton.click();
    await page.waitForTimeout(3000);

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

    await page.waitForTimeout(4000);
});


test('Change B&B description in branding - then validate on front page', async ({ page, brandingPage, baseURL }) => {
    //This is from function for reusing the newPage in other tests if needed
    const {page: newPage} = await launchBrowser();

    await page.waitForTimeout(500); 
    await brandingPage.enterDescription();
    await brandingPage.validateDescriptionFrontPage();
    await brandingPage.submitBtn();
    await brandingPage.validatePopupModal();

    
    //Opening new windows - to validate data on frontpage
    await newPage.goto(`${baseURL}`);
    const descriptionFrontPage = await newPage.locator(`.col-sm-10 > p`);
    const textContext = await descriptionFrontPage.textContent();

    console.log(`This text was from front-page: ${textContext}`);

    await descriptionFrontPage.scrollIntoViewIfNeeded();
    await newPage.screenshot();
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


test.only('test', async ({ baseURL, brandingPage}) => {
   

    const { page } = await launchBrowser();
    const clientPage = new ClientPage(page);

    await brandingPage.changeContactDetails();
    await clientPage.page.goto(`${baseURL}`);

    const contactName = await clientPage.getContactName();
    const contactAddress = await clientPage.getContactAddress();
    const contactPhone = await clientPage.getContactPhone();
    const contactEmail = await clientPage.getContactEmail();


    expect(contactName).toContain(data.contactName);
    expect(contactAddress).toContain(data.contactAddress);
    expect(contactPhone).toContain(data.contactPhone);
    expect(contactEmail).toContain(data.contactEmail);


    console.log(`New contact DATA: 
    ${contactName} \n
    ${contactAddress} \n
    ${contactPhone} \n
    ${contactEmail}
    `);





  });





