import { expect, test } from "../baseFixture/baseFixture";


test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(`${baseURL}/#/admin`);
});


test("Admin login - basic test", async ({ page }) => {

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

test('Passing empty data - Login', async ({ loginPage }) => {
  
  //Passing empty login
  await loginPage.loginAdmin1("","");
  await expect(loginPage.usernameField).toHaveCSS('border', '1px solid rgb(255, 0, 0)');
  await expect(loginPage.passwordField).toHaveCSS('border', '1px solid rgb(255, 0, 0)');

});

test('Passing only username - Login', async ({ loginPage }) => {

  await loginPage.loginAdmin1("admin","");
  await expect(loginPage.usernameField).toHaveCSS('border', '1px solid rgb(255, 0, 0)');
  await expect(loginPage.passwordField).toHaveCSS('border', '1px solid rgb(255, 0, 0)');
});

test('Passing only password - Login', async ({ loginPage }) => {

  await loginPage.loginAdmin1("","password");
  await expect(loginPage.usernameField).toHaveCSS('border', '1px solid rgb(255, 0, 0)');
  await expect(loginPage.passwordField).toHaveCSS('border', '1px solid rgb(255, 0, 0)');
});


test('Admin login - with POM', async ({ loginPage, page }) => {
  
  expect(loginPage.loginHeaderText).toHaveText("Log into your account");
  await loginPage.loginAdmin("admin", "password");
  await page.waitForTimeout(4000);
  expect(loginPage.logoutNavbar).toBeVisible();

});


