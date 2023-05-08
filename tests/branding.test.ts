import { expect } from "@playwright/test";
import { test } from "../baseFixture/baseFixture";
import * as data from "../data-test/brandingData.json";



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


test.only('Test', async ({ page,brandingPage }) => {

    await brandingPage.descriptionField.click({clickCount: 3});
    await brandingPage.descriptionField.press('Backspace');

    await brandingPage.descriptionField.fill(data.description);
    expect(brandingPage.descriptionField).toHaveValue(data.description);

    await brandingPage.submitButton.click();
    await page.waitForTimeout(3000);

    const modalPopup = await page.locator(`div[role='dialog']`);
    await expect(modalPopup).toBeVisible();

    const expectedText = "Branding updated!";
    const modalText = await page.locator(`div.col-12>p `);
    const textContext = await modalText.textContent();

    console.log(textContext);

     expect(textContext).toContain(expectedText)
});
