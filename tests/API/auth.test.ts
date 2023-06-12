import { test, expect } from "@playwright/test";
import AuthPage from "../../pages_api/AuthPage";

//! Pitanje kako prebaciti ovo na config da se samo mijenja?
test.describe("Booking - GET requests", async () => {

  let _cookies;

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
    
    const authPage = new AuthPage(page);
    await authPage.validateToken();

  });

  test.only('Validate wrong token when admin is logged', async ({ page }) => {
    
    const authPage = new AuthPage(page);
    await authPage.validateFakeToken();
    
  });
  


  test("GET all bookings with details", async ({ request }) => {

    const response = await request.get("booking/", {
      headers: {
        cookies: _cookies
      }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body)
  });

});

