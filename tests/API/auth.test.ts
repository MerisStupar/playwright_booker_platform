import { test, expect } from "@playwright/test";
import AuthPage from "../../pages_api/AuthPage";

//! Pitanje kako prebaciti ovo na config da se samo mijenja?
test.describe("Booking - GET requests", async () => {

  let _cookies;
  let authPage;

  test.beforeEach(async ({page}) => {
    authPage = new AuthPage(page);
  })

  test.beforeAll(async ({request}) =>{
    
    const response = await request.post("auth/login", {
        data: {
            username: "admin",
            password: "password"
        },
    });

    expect(response.status()).toBe(200);
    const headers = await response.headers();

    _cookies = headers["set-cookie"];
  });


  test('Validate token when admin is logged', async ({ page }) => {

    await authPage.validateToken();

  });

  test('Validate wrong token when admin is logged', async ({ page }) => {
    
    await authPage.validateFakeToken();
    
  });

  test('Get token then destroy token', async ({ page }) => {

    //Inside destroyToken there is function that generate the token
    await authPage.destroyToken();
  });
  

});

