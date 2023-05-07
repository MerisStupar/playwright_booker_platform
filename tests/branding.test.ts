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
    await page.waitForTimeout(3000);
    await brandingPage.descriptionField.fill(data.description);
    expect(brandingPage.descriptionField).toHaveValue(data.description);
    await page.waitForTimeout(3000);
    await brandingPage.modalPopup.isVisible();
    // expect(brandingPage.modalPopup).toContainText("Branding updated!")
    //dodati context
});
