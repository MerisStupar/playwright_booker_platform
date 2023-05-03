import { expect, test } from "@playwright/test";


import LoginPage from "../pages/loginPage";


test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test("test", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}/#/admin`);
  const usernameField = await page.locator(`#username`);
  const passwordField = await page.locator(`#password`);
  const loginBtn = await page.locator(`#doLogin`);
 
  const navBar = await page.locator(`//a[contains(text(),'Rooms')]`);

  await usernameField.type("admin");
  await passwordField.type("password");
  await loginBtn.click();

  expect(navBar).toBeVisible().then(()=>{
    expect(navBar).toHaveText("Rooms");
  })

  await page.waitForTimeout(3000);

});


test('Test login - with POM', async ({ page, baseURL }) => {
    
    const login = new LoginPage(page);
    await login.enterUsername("admin");
    await login.enterPassword("password");
    await login.clickLoginButton();

});

