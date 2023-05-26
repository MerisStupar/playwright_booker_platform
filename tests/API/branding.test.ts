import {test, expect} from "@playwright/test";
import BrandingPage from "../../pages_api/BrandingPage";
import * as brandingData from "../../data-test/brandingDataAPI.json";


test.beforeEach(async ({page})=>{

    const brandingPage = new BrandingPage(page);
    await brandingPage.getHealtCheck();

});

test('Update Branding - API', async ({ page }) => {
    
    const brandingPage = new BrandingPage(page);
    const response = await brandingPage.getBranding();

    await brandingPage.updateBranding();

    expect(response.contact.email).toBe(brandingData.contact.email);
    expect(response.contact.phone).toBe(brandingData.contact.phone);
    expect(response.map.latitude).toBe(brandingData.map.latitude);

});


